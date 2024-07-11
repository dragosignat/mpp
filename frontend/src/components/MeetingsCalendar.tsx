import Cal, {getCalApi} from '@calcom/embed-react';
import {useEffect} from 'react';

export default function MeetingsCalendar() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal('ui', {
                theme: 'light',
                styles: {branding: {brandColor: '#2563EB'}},
                hideEventTypeDetails: false,
                layout: 'month_view',
            });
        })();
    }, []);
    return (
        <Cal
            calLink='python-django-eb7uk6/30min'
            style={{width: '100%', height: '100%', overflow: 'scroll'}}
            config={{layout: 'month_view'}}
        />
    );
}
