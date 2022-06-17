import { environment } from "../../environments/environment";
// import { MainMenu } from "../model/mainMenu";

export class Config {

    public static readonly SITE_URL = environment.SITE_URL;
    public static readonly API_BASE_URL = environment.API_BASE_URL;

    /** Website Auth Urls **/
    public static readonly BACKEND_AUTH_BASE_URL = Config.API_BASE_URL + '/auth';
    public static readonly BACKEND_ADMIN = Config.API_BASE_URL + '/admin';

    /**
     * Defaults
     */
    public static readonly DEFAULT_META_TITLE = 'Cafe Deutsch';
    public static readonly DEFAULT_META_DESCRIPTION = '';
    public static readonly DEFAULT_META_KEYWORDS = '';

}
