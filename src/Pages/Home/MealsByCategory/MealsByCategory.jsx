import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ribbon from "../../../../public/images/big-ribbon.png"
import "./meal.css"
import MealsCard from './MealsCard/MealsCard';
import useMeals from '../../../hooks/useMeals';
const MealsByCategory = () => {
    const [meals] = useMeals()
    // console.log(meals);
    const breakFast = meals?.filter(meal => meal.mealType === 'Breakfast')
    const lunch = meals?.filter(meal => meal.mealType === 'Lunch')
    const dinner = meals?.filter(meal => meal.mealType === 'Dinner')

    return (
        <div>
            <div className='mt-16 max-w-5xl mx-auto relative'>
                <img src={ribbon} alt="" />
                <p className='text-lg md:text-2xl lg:text-2xl font-bold text-white absolute top-3 left-[140px] md:left-[330px] lg:left-[370px] '>Meals By Category</p>
                <p className='max-w-xl hidden lg:flex text-xs absolute top-12 text-white font-bold text-center left-[190px]'>Appetizers are small, flavorful dishes served before the main course to stimulate the appetite. Common examples include bruschetta, stuffed mushrooms, and shrimp cocktail. They are designed to whet the palate and set the tone for the meal</p>
            </div>
            <div className='mt-14 p-2'>
                <Tabs>
                    <TabList className="flex items-center flex-row justify-center">
                        <Tab>
                            <div>
                                <div>
                                    <img className='w-28 h-16' src="https://www.svgrepo.com/show/233591/breakfast-bacon.svg" alt="" />
                                </div>
                                <p className='text-center text-xl font-bold'>Breakfast</p>
                            </div>
                        </Tab>
                        <Tab>
                            <div>
                                <div>
                                    <img className='w-28 h-16' src="https://www.svgrepo.com/show/233577/sandwich.svg" alt="" />
                                </div>
                                <p className='text-center text-xl font-bold'>Lunch</p>
                            </div>
                        </Tab>
                        <Tab>
                            <div>
                                <div>
                                    <img className='w-28 h-16' src="https://www.svgrepo.com/show/134284/dinner.svg" alt="" />
                                </div>
                                <p className='text-center text-xl font-bold'>Dinner</p>
                            </div>
                        </Tab>
                        <Tab>
                            <div>
                                <div>
                                    <img className='w-28 h-16' src="https://www.svgrepo.com/show/48408/dinner.svg" alt="" />
                                </div>
                                <p className='text-center text-xl font-bold'>All Meals</p>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 mt-10 mb-12'>
                            {
                                breakFast?.slice(0, 8).map(meal => <MealsCard key={meal.id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mb-12'>
                            {
                                lunch?.slice(0, 8).map(meal => <MealsCard key={meal.id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mb-12'>
                            {
                                dinner?.slice(0, 8).map(meal => <MealsCard key={meal.id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mb-12'>
                            {
                                meals?.slice(0, 8).map(meal => <MealsCard key={meal.id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="py-3 max-w-4xl mx-auto flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-400 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-400 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
                <img className='animate-spin' src="https://wedesignthemes.com/html/bella/skins/palebrown/images/driver-two.png" alt="" />
            </div>
        </div>
    );
};

export default MealsByCategory;