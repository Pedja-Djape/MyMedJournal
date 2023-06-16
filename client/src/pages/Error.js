import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/UI/MainNavigation';
import PageContent from '../components/PageContent';

const ErrorPage = () => {
    const error = useRouteError();
    let title = 'An error occured!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }
    else if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page!';
    }
    else if (error.status === 403) {
        title = "Forbidden!"
        message = "You are trying to access a resource without authorization! Please login to continue"
    }

    return (
        <>
        <MainNavigation />
        <PageContent title={title}> 
            <p>{message}</p>
        </PageContent >
        </>
    )
}

export default ErrorPage