import { configure } from 'enzyme';
// Se usar React 17/18+, este adapter comunitário costuma funcionar:
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
