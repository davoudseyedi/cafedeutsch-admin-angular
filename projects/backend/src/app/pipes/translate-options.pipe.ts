import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trans' })

export class TranslateOptionsPipe implements PipeTransform {

    public Options = [
        {
            id: 'Extra network port',
            name: 'پورت شبکه اضافی'
        },
        {
            id: 'Extra power port',
            name: 'پورت پاور اضافی'
        },
        {
            id: 'cpu',
            name: 'پردازنده'
        },
        {
            id: 'bandwidth',
            name: 'پهنای باند'
        },
        {
            id: 'Ram',
            name: 'رم'
        },
        {
            id: 'disk',
            name: 'فضای ذخیره‌سازی'
        },
        {
            id: 'Disk Space',
            name: 'فضای ذخیره‌سازی'
        },
        {
            id: 'Hard',
            name: 'فضای ذخیره‌سازی'
        },
        {
            id: 'Email Accounts',
            name: 'اکانت ایمیل'
        },
        {
            id: 'Management',
            name: 'مدیریت'
        },
        {
            id: 'daily_count',
            name: 'تعداد در روز'
        },
        {
            id: 'hourly_limit',
            name: 'تعداد در ساعت'
        },
        {
            id: 'Domain',
            name: 'دامنه'
        },
        {
            id: 'Addon Domain',
            name: 'دامنه اضافی'
        },
        {
            id: 'Addon_domains',
            name: 'دامنه اضافی'
        },
        {
            id: 'Transactional Email',
            name: 'ایمیل تراکنشی'
        },
        {
            id: 'FTP Backup Storage',
            name: 'فضای پشتیبان‌گیری FTP'
        },
        {
            id: 'No of Units',
            name: 'تعداد یونیت'
        },
        {
            id: 'No of Servers',
            name: 'تعداد سرور'
        },
        {
            id: 'ip',
            name: 'IP اختصاصی'
        },
        {
            id: 'Extra network port',
            name: 'پورت شبکه اضافی'
        },
        {
            id: 'Dedicated VLan',
            name: 'VLan اختصاصیٰ'
        },
        {
            id: 'extra_network_port',
            name: 'پورت شبکه اضافی'
        },
        {
            id: 'Uplink 10GB',
            name: 'لینک 10GB'
        },
        {
            id: 'Server Name',
            name: 'نام سرور'
        },
        {
            id: 'OS Family',
            name: 'سیستم‌عامل'
        },
        {
            id: 'Os Version',
            name: 'نسخه'
        },
        {
            id: 'BW',
            name: 'پهنای‌باند'
        },
        {
            id: 'Extra network port',
            name: 'پورت شبکه اضافی'
        },
        {
            id: 'Network Card',
            name: 'کارت شبکه'
        },
        {
            id: 'Operating System',
            name: 'سیستم‌عامل'
        },
        {
            id: 'Control Panel',
            name: 'کنترل‌پنل'
        },
        {
            id: 'Control_panel',
            name: 'کنترل‌پنل'
        },
        {
            id: 'os_version',
            name: 'سیستم‌عامل'
        },
        {
            id: 'os',
            name: 'سیستم‌عامل'
        },
        {
            id: 'datacenter',
            name: 'دیتاسنتر'
        },
        {
            id: 'server_type',
            name: 'نوع سرور'
        },
        {
            id: 'key_id',
            name: 'کلید SSH'
        },
        {
            id: 'extra_power_port',
            name: 'پورت برق اضافه'
        },
        {
            id: 'dedicated_vlan',
            name: 'vlan اختصاصی'
        },
        {
            id: 'servers',
            name: 'تعداد سرور'
        },
        {
            id: 'units',
            name: 'تعداد یونیت'
        },
        {
            id: 'uplink_10GB',
            name: 'uplink_10GB'
        },
        {
            id: 'BGP',
            name: 'BGP'
        },
        {
            id: 'Location',
            name: 'موقعیت'
        },
        {
            id: 'irnichandle',
            name: 'شناسه ایرنیک'
        }
    ]

    transform(value: any): any {

        for ( let item of this.Options ) {

            if ( value && value.replace('range_', '').replace('hidden_', '').toLowerCase() == item.id.toLowerCase() ) {

                return item.name;

            }

        }

        return value;

    }

}
