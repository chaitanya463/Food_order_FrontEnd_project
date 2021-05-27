import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import {useCallback, useEffect, useState} from 'react'; 

const AvailableMeals = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://react-http-dd09a-default-rtdb.firebaseio.com//MEALS.json');
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      const tranData = [];
      for (const key in data) {
        tranData.push(data[key]);
      }
      setAvailableMeals(tranData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

    useEffect(() => {
      fetchMeals();
    }, [fetchMeals]);

    const mealsList = availableMeals.map( (meal) => (
        <MealItem 
            id= {meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
              {isLoading && !error && <p> Loading... </p>}
              {!isLoading && error && <p> {error.message} </p>}
              {!isLoading && availableMeals.length > 0 && <ul>{mealsList}</ul>}
              {!isLoading && availableMeals.length === 0 && !error && <p> No meals found. </p>}
            </Card>
            
        </section>
    );
};

export default AvailableMeals;