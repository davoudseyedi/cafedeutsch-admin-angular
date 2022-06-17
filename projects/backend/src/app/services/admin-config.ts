import { Config } from "./config";
// import { Menu } from "../model/menu";

export class AdminConfig {

    /** Admin API Auth **/
    public static readonly ADMIN_LOGIN = Config.BACKEND_AUTH_BASE_URL + '/login';
    public static readonly ADMIN_REGISTER = Config.BACKEND_AUTH_BASE_URL + '/register';
    public static readonly ADMIN_LOGOUT = Config.BACKEND_AUTH_BASE_URL + '/logout';
    public static readonly ADMIN_GET_PROFILE = Config.BACKEND_AUTH_BASE_URL + '/profile';
    public static readonly ADMIN_LIST_USERS = Config.BACKEND_AUTH_BASE_URL + '/users';
    public static readonly ADMIN_AVATAR_UPLOAD = Config.BACKEND_AUTH_BASE_URL + '/upload-avatar';

  /** Admin API Content **/
    public static readonly ADMIN_GET_ALL_POSTS = Config.BACKEND_ADMIN + '/posts';
    public static readonly ADMIN_GET_ALL_EPISODES = Config.BACKEND_ADMIN + '/episodes';
    public static readonly ADMIN_GET_ALL_CATEGORIES = Config.BACKEND_ADMIN + '/category';
    public static readonly ADMIN_GET_ALL_CONTACT_SUBMISSIONS = Config.BACKEND_ADMIN + '/contact';

    // public static readonly ADMIN_MAIN_MENU = [
    //     new Menu('/panel/dashboard','داشبورد', [], 'icon-dashboard', null),
    //     new Menu('/panel/super-admin','مدیریت کل', ['super_admin'], 'icon-monitoring', [
    //         new Menu('/panel/super-admin/admin-user','کاربران ادمین', ['super_admin'], '', null),
    //         new Menu('/panel/super-admin/config','مدیریت سیستم', ['super_admin'], '', null),
    //         new Menu('/panel/super-admin/command-call','دستورت اجرایی', ['super_admin'], '', null),
    //         new Menu('/panel/super-admin/logs','گزارش‌ها', ['super_admin'], '', null),
    //         new Menu('/panel/super-admin/discount','تخفیف های مشتریان', ['super_admin'], '', null),
    //     ]),
    //     new Menu('/panel/client','مشتریان', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], 'icon-profile', [
    //         new Menu('/panel/client/list','لیست مشتریان', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/service','سرویس‌های مشتریان', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/domain','دامنه‌های مشتریان', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/dns','DNS ابری', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/domain-info','اطلاعات ثبت‌ دامنه', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/document','مدارک مشتریان', ['super_admin', 'crm_user'], '', null),
    //         new Menu('/panel/client/note','یادداشت مشتریان', ['super_admin', 'crm_user'], '', null),
    //         new Menu('/panel/client/active-carts','سبد خریدهای فعال', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/due-date','جدول سررسید سرویس', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/iran-noafarin','ایران نوآفرین', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/manage-service','مدیریت سرویس', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/business-partner','شرکای تجاری', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', null),
    //         new Menu('/panel/client/cdn','CDN', ['super_admin', 'product_admin', 'order_manager', 'crm_user', 'support_user', 'support_layer_2'], '', []),
    //     ]),
    //     new Menu('/panel/product','محصولات', ['super_admin', 'product_admin'], 'icon-server-rack-4', [
    //         new Menu('/panel/product/list','لیست محصولات', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/product/group','دسته‌بندی محصولات', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/product/template','قالب‌ها', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/product/tld','پسوند دامنه‌ها', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/product/workflow','گردش کار', ['super_admin', 'product_admin'], '', [
    //             new Menu('/panel/product/workflow/log','گزارش گردش‌کار', ['super_admin', 'product_admin'], '', null),
    //         ]),
    //         new Menu('/panel/product/module','مدیریت ماژول‌ها', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/product/provision','provision', ['super_admin', 'product_admin'], '', null),
    //
    //     ]),
    //     new Menu('/panel/datacenter','زیرساخت', ['super_admin', 'vm_manager', 'support_layer_2', 'support_user','datacenter_user', 'order_manager'], 'icon-hostiran-cloud', [
    //         new Menu('/panel/datacenter/datacenter-report','گزارش دیتاسنتر', ['super_admin','datacenter_user','vm_manager'], '', null),
    //         new Menu('/panel/datacenter/server','لیست سرور', ['super_admin','datacenter_user','vm_manager'], '', null),
    //         new Menu('/panel/datacenter/announcements','اطلاعیه دیتاسنتر', ['super_admin'], '', null),
    //     ]),
    //     new Menu('/panel/cloud','ابر', ['super_admin', 'vm_manager', 'support_layer_2', 'support_user','datacenter_user', 'order_manager'], 'icon-hostiran-cloud', [
    //         new Menu('/panel/cloud/list','لیست ابرها', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/vm-finance','مالی', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/buckets','باکت ها', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/s3','ذخیره ساز ابری', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/products-suggestion','محصولات پیشنهادی', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/vm-config','مدیریت ابر', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/hetzner','لیست سرورهای Hetzner', ['super_admin', 'vm_manager', 'support_layer_2', 'support_user', 'order_manager'], '', null),
    //         new Menu('/panel/cloud/ip','IPهای ایران', ['super_admin', 'vm_manager'], '', null),
    //         new Menu('/panel/cloud/notifications','نوتیفیکیشن', ['super_admin', 'vm_manager'], '', null),
    //     ]),
    //     new Menu('/panel/content','محتوا و بازاریابی', ['super_admin', 'content_manager', 'blog_admin', 'content_user'], 'icon-copy-line', [
    //         new Menu('/panel/content/information-system','راهنما', ['super_admin', 'content_manager', 'content_user'], '', [
    //             new Menu('/panel/content/information-system','لیست راهنما', ['super_admin', 'content_manager', 'content_user'], '', null),
    //             new Menu('/panel/content/information-system-category','دسته‌بندی راهنما', ['super_admin', 'content_manager', 'content_user'], '', null)
    //         ]),
    //         new Menu('/panel/content/announcement','اطلاعیه', ['super_admin', 'content_manager'], '', null),
    //         new Menu('/panel/content/blog','بلاگ', ['super_admin', 'content_manager', 'blog_admin'], '', null),
    //         new Menu('/panel/content/home-slider','اسلایدشو', ['super_admin', 'content_manager'], '', null),
    //         new Menu('/panel/content/proxy','آنتی تحریم', ['super_admin', 'content_manager'], '', null),
    //         new Menu('/panel/content/enquiry','استعلام', ['super_admin', 'content_manager'], '', null),
    //         new Menu('/panel/content/promotion','کدهای تخفیف', ['super_admin', 'content_manager'], '', [
    //             new Menu('/panel/content/vm-coupon','کوپن ابری', ['super_admin', 'content_manager'], '', null),
    //             new Menu('/panel/content/used-gift-code','کدهای تخفیف استفاده شده', ['super_admin', 'content_manager'], '', null)
    //         ]),
    //     ]),
    //     new Menu('/panel/career','منابع انسانی', ['super_admin', 'hr_manager'], 'icon-profile-line', [
    //         new Menu('/panel/career/list','فرصت‌های شغلی', ['super_admin', 'hr_manager'], '', null),
    //         new Menu('/panel/career/application','درخواست‌های همکاری', ['super_admin', 'hr_manager'], '', null)
    //     ]),
    //     new Menu('/panel/finance','مالی', ['super_admin', 'financial_manager', 'support_layer_2', 'support_user', 'content_manager'], 'icon-credit-card', [
    //         new Menu('/panel/finance/invoice','صورتحساب', ['super_admin', 'financial_manager', 'support_layer_2', 'support_user'], '', null),
    //         new Menu('/panel/finance/transaction','تراکنش‌ها', ['super_admin', 'financial_manager'], '', null),
    //         new Menu('/panel/finance/order','سفارش', ['super_admin', 'financial_manager', 'support_layer_2', 'support_user'], '', null),
    //         new Menu('/panel/finance/offline-payment','پرداخت‌های آفلاین', ['super_admin', 'financial_manager', 'support_layer_2', 'support_user'], '', null),
    //         new Menu('/panel/finance/account','شماره‌ حساب‌ها', ['super_admin', 'financial_manager', 'content_manager'], '', null),
    //         new Menu('/panel/finance/zarinpal','زرین‌پال', ['super_admin', 'financial_manager'], '', null),
    //         new Menu('/panel/finance/credit/add','اعتبار مشتری', ['super_admin', 'financial_manager'], '', null),
    //         new Menu('/panel/finance/client-credit','گزارش اعتبار کاربران', ['super_admin', 'financial_manager'], '', null),
    //         new Menu('/panel/finance/official-bill','فاکتور رسمی', ['super_admin', 'financial_manager', 'support_layer_2', 'support_user'], '', null)
    //     ]),
    //     new Menu('/panel/notification','نوتیفیکیشن', ['super_admin'], 'icon-buzz', [
    //         new Menu('/panel/notification/profile','ماژول‌ها', ['super_admin'], '', null),
    //         new Menu('/panel/notification/template','قالب‌ها', ['super_admin'], '', null),
    //         new Menu('/panel/notification/log','گزارش‌ها', ['super_admin'], '', null),
    //     ]),
    //     new Menu('/panel/hostiran-knowledge','دانش هاست ایرانی', [], 'icon-hostiran-shape', null),
    //     new Menu('/panel/logs-reports','گزارش خطاها', ['super_admin', 'vm_manager', 'support_layer_2', 'support_user','datacenter_user', 'order_manager'], 'icon-t-warning', null),
    //     new Menu('/panel/status-page','وضعیت سرویس‌ها', ['super_admin', 'product_admin'], 'icon-monitoring', [
    //         new Menu('/panel/status-page/component','سرویس‌ها', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/status-page/issue','رخداد‌ها', ['super_admin', 'product_admin'], '', null),
    //         new Menu('/panel/status-page/subscriber','دنبال‌کننده‌ها', ['super_admin', 'product_admin'], '', null),
    //
    //
    //     ]),
    // ]

}
