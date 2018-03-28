import driversPage from '@/components/drivers';
import driverPage from '@/components/driver';
import errorPage from '@/components/error';
import constructorPage from '@/components/constructor';
import constructorsPage from '@/components/constructors';

export default {
    '/': () => driversPage(),
    '/drivers': () => driversPage(),
    '/drivers/page/:page': (page) => driversPage(page),
    '/drivers/:slug': (driverID) => driverPage(driverID),
    '/constructors': () => constructorsPage(),
    '/constructors/page/:page': (page) => constructorsPage(page),
    '/constructors/:constructor': (constructor) => constructorPage(constructor),
    '*': () => errorPage('404 - Page not found')
}