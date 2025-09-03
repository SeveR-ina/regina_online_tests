/**
 * API utility functions for testing REST API endpoints
 * Provides authentication, CRUD operations, and response validation
 */

import { API, PATHS } from "@/data/constants";
import { TEST_MESSAGES } from "@/data/logger-messages";
import { APIRequestContext, expect } from "@playwright/test";
import { TestConfig, logger } from "./core.utils";

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  featured_image?: string;
  external_link?: string;
  hide_link: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  seo_meta: {
    title: string;
    description: string;
    keywords: string;
  };
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
}

/**
 * Main API client for interacting with backend services
 */
export class ApiClient {
  private apiContext: APIRequestContext;
  private baseURL: string;
  private authToken?: string;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
    this.baseURL = TestConfig.apiURL;
  }

  /**
   * Authentication methods
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; token?: string; user?: User }> {
    const response = await this.apiContext.post(`${this.baseURL}/auth/login`, {
      data: { email, password },
    });

    const responseData = await response.json();

    if (response.ok() && responseData.success) {
      this.authToken = responseData.data.token;
      return {
        success: true,
        token: responseData.data.token,
        user: responseData.data.user,
      };
    }

    logger.error(
      TEST_MESSAGES.API.LOGIN_FAILED(
        responseData.error ?? response.statusText()
      )
    );
    return { success: false };
  }

  async loginAsAdmin(): Promise<{
    success: boolean;
    token?: string;
    user?: User;
  }> {
    const credentials = TestConfig.adminCredentials;
    return await this.login(credentials.email, credentials.password);
  }

  async logout(): Promise<boolean> {
    try {
      const response = await this.apiContext.post(
        `${this.baseURL}/auth/logout`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        this.authToken = undefined;
        return true;
      }

      logger.error(TEST_MESSAGES.API.LOGOUT_FAILED(response.statusText()));
      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.LOGOUT_ERROR(String(error)));
      return false;
    }
  }

  /**
   * User management methods
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiContext.get(
        `${this.baseURL}/auth/profile`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        const data = await response.json();
        return data.data.user;
      }

      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.USER_GET_FAILED(String(error)));
      return null;
    }
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
  }): Promise<User | null> {
    try {
      const response = await this.apiContext.post(
        `${this.baseURL}/admin/users`,
        {
          headers: this.getAuthHeaders(),
          data: userData,
        }
      );

      if (response.ok()) {
        const data = await response.json();
        return data.data.user;
      }

      logger.error(
        TEST_MESSAGES.API.USER_CREATION_FAILED(response.statusText())
      );
      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.USER_CREATION_ERROR(String(error)));
      return null;
    }
  }

  /**
   * Blog post management methods
   */
  async createBlogPost(postData: {
    title: string;
    content: string;
    excerpt?: string;
    status?: "draft" | "published";
    featured_image?: string;
    external_link?: string;
    hide_link?: boolean;
    seo_meta?: {
      title: string;
      description: string;
      keywords: string;
    };
  }): Promise<BlogPost | null> {
    try {
      const response = await this.apiContext.post(`${this.baseURL}/blog`, {
        headers: this.getAuthHeaders(),
        data: {
          status: "draft",
          hide_link: false,
          ...postData,
          seo_meta: {
            title: "",
            description: "",
            keywords: "",
            ...postData.seo_meta,
          },
        },
      });

      if (response.ok()) {
        const data = await response.json();
        return data.data.post;
      }

      const errorData = await response.json().catch(() => ({}));
      logger.error(
        TEST_MESSAGES.API.BLOG_POST_CREATION_FAILED(
          errorData.error ?? response.statusText()
        )
      );
      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_CREATION_ERROR(String(error)));
      return null;
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await this.apiContext.get(`${this.baseURL}/blog/${id}`);

      if (response.ok()) {
        const data = await response.json();
        return data.data.post;
      }

      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_GET_FAILED(id, String(error)));
      return null;
    }
  }

  async getBlogPosts(
    options: {
      status?: "draft" | "published" | "all";
      limit?: number;
      offset?: number;
      search?: string;
    } = {}
  ): Promise<{ posts: BlogPost[]; total: number; pagination: any } | null> {
    try {
      const params = new URLSearchParams();

      if (options.status && options.status !== "all") {
        params.append("status", options.status);
      }
      if (options.limit) {
        params.append("limit", options.limit.toString());
      }
      if (options.offset) {
        params.append("offset", options.offset.toString());
      }
      if (options.search) {
        params.append("search", options.search);
      }

      const response = await this.apiContext.get(
        `${this.baseURL}/blog?${params.toString()}`
      );

      if (response.ok()) {
        const data = await response.json();
        return {
          posts: data.data.data ?? [],
          total: data.data.total ?? 0,
          pagination: data.data.pagination ?? {},
        };
      }

      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POSTS_GET_FAILED(String(error)));
      return null;
    }
  }

  async updateBlogPost(
    id: string,
    postData: Partial<{
      title: string;
      content: string;
      excerpt: string;
      status: "draft" | "published";
      featured_image: string;
      external_link: string;
      hide_link: boolean;
      seo_meta: {
        title: string;
        description: string;
        keywords: string;
      };
    }>
  ): Promise<BlogPost | null> {
    try {
      const response = await this.apiContext.put(`${this.baseURL}/blog/${id}`, {
        headers: this.getAuthHeaders(),
        data: postData,
      });

      if (response.ok()) {
        const data = await response.json();
        return data.data.post;
      }

      const errorData = await response.json().catch(() => ({}));
      logger.error(
        TEST_MESSAGES.API.BLOG_POST_UPDATE_FAILED(
          errorData.error ?? response.statusText()
        )
      );
      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_UPDATE_ERROR(String(error)));
      return null;
    }
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    try {
      const response = await this.apiContext.delete(
        `${this.baseURL}/blog/${id}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        return true;
      }

      logger.error(
        TEST_MESSAGES.API.BLOG_POST_DELETE_FAILED(response.statusText())
      );
      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_DELETE_ERROR(String(error)));
      return false;
    }
  }

  async pinBlogPost(id: string): Promise<boolean> {
    try {
      const response = await this.apiContext.post(
        `${this.baseURL}/blog/${id}/pin`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        return true;
      }

      logger.error(
        TEST_MESSAGES.API.BLOG_POST_PIN_FAILED(response.statusText())
      );
      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_PIN_ERROR(String(error)));
      return false;
    }
  }

  async unpinBlogPost(id: string): Promise<boolean> {
    try {
      const response = await this.apiContext.delete(
        `${this.baseURL}/blog/${id}/pin`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        return true;
      }

      logger.error(
        TEST_MESSAGES.API.BLOG_POST_UNPIN_FAILED(response.statusText())
      );
      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_UNPIN_ERROR(String(error)));
      return false;
    }
  }

  async likeBlogPost(id: string): Promise<boolean> {
    try {
      const response = await this.apiContext.post(
        `${this.baseURL}/blog/${id}/like`
      );

      if (response.ok()) {
        return true;
      }

      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_POST_LIKE_ERROR(String(error)));
      return false;
    }
  }

  /**
   * Search functionality
   */
  async searchBlogPosts(
    query: string,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ posts: BlogPost[]; total: number } | null> {
    try {
      const params = new URLSearchParams({
        search: query,
        status: "published",
      });

      if (options.limit) {
        params.append("limit", options.limit.toString());
      }
      if (options.offset) {
        params.append("offset", options.offset.toString());
      }

      const response = await this.apiContext.get(
        `${this.baseURL}/blog?${params.toString()}`
      );

      if (response.ok()) {
        const data = await response.json();
        return {
          posts: data.data.data ?? [],
          total: data.data.total ?? 0,
        };
      }

      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.BLOG_SEARCH_ERROR(String(error)));
      return null;
    }
  }

  /**
   * System health and monitoring
   */
  async checkHealth(): Promise<boolean> {
    try {
      // Health endpoint is on the backend service (different port in local)
      const target = TestConfig.target;
      let healthUrl: string;

      if (target === "local") {
        // For local: backend is on different port
        const backendPort = API.SERVICES.BACKEND_PORT;
        healthUrl = TestConfig.isDocker
          ? `http://host.docker.internal:${backendPort}${API.ENDPOINTS.HEALTH}`
          : `http://localhost:${backendPort}${API.ENDPOINTS.HEALTH}`;
      } else {
        // For production: health endpoint is proxied through main domain
        healthUrl = `${TestConfig.baseURL}${API.ENDPOINTS.HEALTH}`;
      }

      const response = await this.apiContext.get(healthUrl);

      if (response.ok()) {
        const data = await response.json();
        // Validate health response structure using constants
        return (
          data.status === API.HEALTH_CHECK.EXPECTED_STATUS && data.timestamp
        );
      }

      return false;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.HEALTH_CHECK_FAILED(String(error)));
      return false;
    }
  }

  async getSystemStats(): Promise<any | null> {
    try {
      const response = await this.apiContext.get(
        `${this.baseURL}/admin/stats`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (response.ok()) {
        const data = await response.json();
        return data.data;
      }

      return null;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.SYSTEM_STATS_FAILED(String(error)));
      return null;
    }
  }

  /**
   * Utility methods
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Response validation helpers
   */
  static validateSuccessResponse(response: any): void {
    expect(response).toHaveProperty("success", true);
    expect(response).toHaveProperty("data");
  }

  static validateErrorResponse(response: any): void {
    expect(response).toHaveProperty("success", false);
    expect(response).toHaveProperty("error");
  }

  static validateBlogPostStructure(post: any): void {
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("content");
    expect(post).toHaveProperty("status");
    expect(post).toHaveProperty("created_at");
    expect(post).toHaveProperty("updated_at");
    expect(post).toHaveProperty("seo_meta");

    // seo_meta can be null or an object with the required fields
    if (post.seo_meta !== null) {
      expect(post.seo_meta).toHaveProperty("title");
      expect(post.seo_meta).toHaveProperty("description");
      expect(post.seo_meta).toHaveProperty("keywords");
    }
  }

  static validateUserStructure(user: any): void {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
  }

  static validatePaginationStructure(pagination: any): void {
    expect(pagination).toHaveProperty("page");
    expect(pagination).toHaveProperty("limit");
    expect(pagination).toHaveProperty("total");
    expect(pagination).toHaveProperty("pages");
  }
}

/**
 * Test data cleanup utilities
 */
export class TestDataCleanup {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async cleanupTestBlogPosts(): Promise<void> {
    try {
      const result = await this.apiClient.getBlogPosts({
        status: "all",
        limit: 100,
      });

      if (result) {
        const testPosts = result.posts.filter(
          post =>
            post.title.includes("Test Blog Post") ||
            post.title.includes("E2E") ||
            post.content.includes("E2E testing")
        );

        for (const post of testPosts) {
          await this.apiClient.deleteBlogPost(post.id);
        }
      }
    } catch (error) {
      logger.error(TEST_MESSAGES.API.CLEANUP_FAILED(String(error)));
    }
  }
}

/**
 * API testing utilities
 */
export class ApiTestHelpers {
  /**
   * Test API rate limiting
   */
  static async testRateLimit(
    apiClient: ApiClient,
    endpoint: string,
    maxRequests: number = 100,
    windowMs: number = 60000
  ): Promise<{ rateLimited: boolean; requestsBeforeLimit: number }> {
    const startTime = Date.now();
    let requestCount = 0;

    while (Date.now() - startTime < windowMs && requestCount < maxRequests) {
      try {
        // Make request based on endpoint type
        let _response;
        if (endpoint === PATHS.BLOG) {
          await apiClient.getBlogPosts();
        } else if (endpoint === "/health") {
          await apiClient.checkHealth();
        }

        requestCount++;
      } catch (error) {
        // Check if rate limited
        if (error && typeof error === "object" && "status" in error) {
          if ((error as any).status === 429) {
            return { rateLimited: true, requestsBeforeLimit: requestCount };
          }
        }
        break;
      }
    }

    return { rateLimited: false, requestsBeforeLimit: requestCount };
  }

  /**
   * Test API response times
   */
  static async measureApiResponseTime(
    apiClient: ApiClient,
    operation: () => Promise<any>
  ): Promise<{ responseTime: number; success: boolean }> {
    const startTime = Date.now();

    try {
      await operation();
      const responseTime = Date.now() - startTime;
      return { responseTime, success: true };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      logger.error(
        TEST_MESSAGES.API.OPERATION_FAILED(responseTime, String(error))
      );
      return { responseTime, success: false };
    }
  }

  /**
   * Validate API error handling
   */
  static async testErrorHandling(
    apiContext: APIRequestContext,
    endpoint: string,
    expectedStatusCode: number
  ): Promise<boolean> {
    try {
      const response = await apiContext.get(endpoint);
      return response.status() === expectedStatusCode;
    } catch (error) {
      logger.error(TEST_MESSAGES.API.ERROR_HANDLING_FAILED(String(error)));
      return false;
    }
  }
}
