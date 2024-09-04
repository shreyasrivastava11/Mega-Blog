import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  // CLient is declared to build the connection of appwrite with the application

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // set EndPoint defines how the application connect to the appwrite server
    // set Project is used to give the interaction of application with the specific appwrite project

    this.account = new Account(this.client);

    // Through account declaration appwrite provide some sought of method by which we can build the functions for account
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (userAccount) {
      // call Another method

      return this.login({ email, password });
    } else {
      return userAccount;
    }
  }

  async login({ email, password }) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    return await this.account.get();
  }

  async logout() {
    return await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
