import PageContent from '../components/PageContent'
import { Link } from 'react-router-dom';

const CustomLink = ( props ) => {
    return (
        <Link to={props.to} className='underline decoration-1 text-[#f2c11d]'>
            {props.title}
        </Link>
    )
}

const Home = () => {
    return <PageContent title='Welcome to MyMedJournal!'>
        <div className='flex flex-col justify-center items-center gap-16 p-8 w-full'>
            <div className='w-[50%]'>
                <h2 className='text-5xl pb-4 text-[#f2c11d]'>Search.</h2>
                <p className='text-3xl'>
                    Use the <CustomLink to='/search' title="search tool"/> to search any keywords for matching 
                    articles in the famous PubMed database. <CustomLink to='/auth?mode=signup' title='Sign up'/> to
                    favorite articles and come back to them for later! 
                </p>
            </div>
            <div className='w-[50%]'>
                <h2 className='text-5xl pb-4 text-[#f2c11d]'>Take notes.</h2>
                <p className='text-3xl'>
                    <CustomLink to='/auth?mode=signup' title='Create an account'/> and make some notes. Confused about 
                    a topic? Can't remember some terms? Simply create some notes and come back to them whenever 
                    you need to!
                </p>
            </div>

        </div>
    </PageContent>;
};
  
export default Home;
