import React, { FunctionComponent, ReactElement } from 'react';

import CustomHead from '../../../components/__shared/custom-head';
import { SearchContainer } from '../../../components/page-search';

const HomePage: FunctionComponent = (): ReactElement => {
    return (
        <>
            <CustomHead />
            <SearchContainer />
        </>
    );
};

export default HomePage;
