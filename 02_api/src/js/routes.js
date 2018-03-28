import DriversPage from '@/components/drivers';
import DriverPage from '@/components/driver';
import ErrorPage from '@/components/error';
import ConstructorPage from '@/components/constructor';
import ConstructorsPage from '@/components/constructors';

export default {
    '/': () => DriversPage(),
    '/drivers': () => DriversPage(),
    '/drivers/page/:page': (page) => DriversPage(page),
    '/drivers/:slug': (driverID) => DriverPage(driverID),
    '/constructors': () => ConstructorsPage(),
    '/constructors/page/:page': (page) => ConstructorsPage(page),
    '/constructors/:constructor': (constructor) => ConstructorPage(constructor),
    '*': () => ErrorPage('404 - Page not found')
}