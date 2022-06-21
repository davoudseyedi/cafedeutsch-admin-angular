export class Language {

  private static title: any;

  // WEBSITE LANGUAGE
  public static  readonly  LOGIN = {
    title: 'Login',
    description: ''
  }
  public static  readonly  POSTS = {
    title: 'Posts',
    description: ''
  }
  public static  readonly  SINGLE_POST = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  SINGLE_POST_ADD = {
    title: 'Create Post',
    description: ''
  }

  public static  readonly  EPISODES = {
    title: 'Episodes',
    description: ''
  }

  public static  readonly  SINGLE_EPISODE = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  SINGLE_EPISODE_ADD = {
    title: 'Create EPISODE',
    description: ''
  }

  public static  readonly  CATEGORIES = {
    title: 'Categories',
    description: ''
  }
  public static  readonly  SINGLE_CATEGORY = {
    title: 'Category {{var}}',
    description: ''
  }
  public static  readonly  TERMS = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  SINGLE_TERM = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  SINGLE_CATEGORY_ADD = {
    title: 'Create Category',
    description: ''
  }

  public static  readonly  USERS = {
    title: 'Users',
    description: ''
  }
  public static  readonly  SINGLE_USER = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  SINGLE_USER_ADD = {
    title: 'Create User',
    description: ''
  }

  public static  readonly  CONTACT_SUBMISSIONS = {
    title: 'Submissions',
    description: ''
  }

  public static getTitle(key:string): string {
    const myObj: {[index: string]:any} = Language;
    return myObj[key]['title'] + ' | CafeDeutsch';
  }

  public static getDescription(key:any): string {
    const myObj: {[index: string]:any} = Language;
    return myObj[key]['description'];
  }

}
