import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
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
