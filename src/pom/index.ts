// import { test as baseTest, Page } from "@playwright/test";

// export default class App {
//   constructor(readonly page: Page) {
//     this.page = page;
//   }

//   get homePage() {
//     return new HomePage(this.page);
//   }

//   get adminLoginPage() {
//     return new AdminLoginPage(this.page);
//   }

//   get registrationPage() {
//     return new RegistrationPage(this.page);
//   }

//   get articlePage() {
//     return new ArticlePage(this.page);
//   }

//   get topicPage() {
//     return new ItemPage(this.page, "/topics");
//   }

//   get authorPage() {
//     return new ItemPage(this.page, "/autoren");
//   }

//   get authorIndexPage() {
//     return new IndexPage(this.page, "/autoren");
//   }

//   get searchResultsPage() {
//     return new SearchResultsPage(this.page, "/autoren");
//   }
// }

// export const test = baseTest.extend<{
//   homePage: HomePage;
//   articlePage: ArticlePage;
//   loginPage: LoginPage;
//   registrationPage: RegistrationPage;
//   topicPage: ItemPage;
//   topicIndexPage: IndexPage;
//   topicResultPage: IndexPage;
//   authorIndexPage: IndexPage;
//   authorPage: ItemPage;
//   searchResultsPage: SearchResultsPage;
// }>({
//   homePage: async ({ page }, use) => {
//     await use(new HomePage(page));
//   },
//   articlePage: async ({ page }, use) => {
//     await use(new ArticlePage(page));
//   },
//   loginPage: async ({ page }, use) => {
//     await use(new LoginPage(page));
//   },
//   registrationPage: async ({ page }, use) => {
//     await use(new RegistrationPage(page));
//   },
//   topicPage: async ({ page }, use) => {
//     await use(new ItemPage(page, "/topics"));
//   },
//   topicIndexPage: async ({ page }, use) => {
//     await use(new IndexPage(page, "/topics"));
//   },
//   topicResultPage: async ({ page }, use) => {
//     await use(new IndexPage(page, "/topics"));
//   },
//   authorIndexPage: async ({ page }, use) => {
//     await use(new IndexPage(page, "/autoren"));
//   },
//   authorPage: async ({ page }, use) => {
//     await use(new ItemPage(page, "/autoren"));
//   },
//   searchResultsPage: async ({ page }, use) => {
//     await use(new SearchResultsPage(page));
//   },
// });
