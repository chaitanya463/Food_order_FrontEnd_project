import {Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';

const Header = (props) => {

    const cartClickHandler = () => {
        console.log('inside the Header');
        props.onShowCart();
    }
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Foodies</h1>
                <HeaderCardButton onCartClick={cartClickHandler}/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="delicious food"/>
            </div>
        </Fragment>
    );
};

export default Header;