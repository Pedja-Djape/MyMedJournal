import { Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const DashboardNavigation = () => {
  return (
    <>
    <div style={{paddingTop: '3rem'}}>
        <Sidebar>
                <Menu>
                    <MenuItem component={<Link to='/dashboard/notes' />}>Notes</MenuItem>
                    <MenuItem component={<Link to='/dashboard/favorites' />} >Favorite Articles</MenuItem>
                </Menu>
            </Sidebar>
    </div>
        
    </>
  )
}

export default DashboardNavigation

