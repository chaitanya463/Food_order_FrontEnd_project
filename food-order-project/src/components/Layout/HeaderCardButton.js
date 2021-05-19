import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
    const onClickHandler = () => {
        console.log('inside the HeaderCardButton');
        props.onCartClick();
    }
    return (
        <button className={styles.button} onClick={onClickHandler}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
            <span className={styles.badge}>
                3
            </span >
        </button>
    );
}

export default HeaderCardButton;