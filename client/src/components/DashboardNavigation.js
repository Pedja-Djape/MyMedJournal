import { Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardNavigation = () => {
  const uid = useSelector(state => state.auth.id);
  return (
    <>
    <div style={{paddingTop: '3rem'}}>
        <Sidebar>
                <Menu>
                    <MenuItem component={<Link to={`/dashboard/${uid}/notes`} />}>Notes</MenuItem>
                </Menu>
            </Sidebar>
    </div>
        
    </>
  )
}

export default DashboardNavigation

