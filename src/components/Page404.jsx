import '../index.css';
import { useHistory } from 'react-router-dom';
import React from 'react';

const Page404 = () => {
    const history = useHistory();

    return(
        <div className="link page404">
            <span className="page404__caption">404</span>
            <span className="page404__text">Страница не найдена</span>
            <span className="page404__link" onClick={history.goBack}>Назад</span>
        </div>
    );
}

export default Page404;