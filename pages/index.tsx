import { FunctionComponent } from 'react';
import CustomHead from '../components/__shared/CustomHead';
import Search from '../components/search';

const HomePage: FunctionComponent = () => (
    <div>
      <CustomHead />
      <Search />
    </div>
  );

export default HomePage;
