import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  // { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  // console.log(USERLIST);
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  

  // const userProfile = async () => {
  //   axios.post(`https://zorlvan-enterprise-backend.herokuapp.com/account/profile?user_id=${window.localStorage.getItem('user_id')}`, {
  //     "username": getFieldProps('userName').value,
  //     "password": getFieldProps('password').value
  //   }, null)
  //   .then(function (response) {
  //     console.log(response);
  //     window.localStorage.setItem('token', response.data.token);
  //     window.localStorage.setItem('user_id', response.data.user_id);
  //     if(response.data.response === "Successful login!"){
  //       navigate('/dashboard/blog')
  //     } else {
  //       navigate('/login')
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  // console.log(users);
  useEffect(async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/account/explore`, { 
      headers: { 
        Authorization: "Token " + window.localStorage.getItem('token'),
      }
    })
    .then(function (response) {
      // const data = response.data.results;
      // for (let i = 0; i < response.data.count; i++) {
      //   if (response.data.results[i].username === "admin") {
      //     const index = data.indexOf(i);
      //     data.splice(index, 1);
      //   }
      // }
      setUsers(response.data.results)
      // window.localStorage.setItem('token', response.data.token);
      // window.localStorage.setItem('user_id', response.data.user_id);
      // if(response.data.response === "Successful login!"){
      //   navigate('/dashboard/blog')
      // } else {
      //   navigate('/login')
      // }
    })
    .catch(function (error) {
      console.log(error);
    });
  },[]);

  return (
    <Page title="Search Users | PhilGreat">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Search Users
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      // const name = first_name + " " + last_name;
                      // console.log(row)
                      // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      // const isItemSelected = selected.indexOf(name) !== -1;
                      const { bio, email, first_name, is_org, last_name, pk, profile_pic, username } = row;
                        
                      return (
                        <TableRow
                          // hover
                          // key={id}
                          // tabIndex={-1}
                          // role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                          <TableCell component="th" scope="row" padding="none">
                            <RouterLink to={{
                              pathname: `/dashboard/profile/${pk}`,
                            }}
                            style={{ textDecoration: "none" }}
                            > 
                              <Stack direction="row" alignItems="center" spacing={2} style={{ marginLeft: "13px" }}>
                                <Avatar alt={first_name} src={profile_pic} />
                                <Typography variant="subtitle2" noWrap>
                                  {is_org ? username : first_name + " " + last_name}
                                  {is_org ? <span style={{ position: "absolute", marginTop: "1px" }}><VerifiedUserIcon fontSize="small" /></span> : ""}
                                </Typography>
                              </Stack>
                            </RouterLink>
                          </TableCell>
                          {/* <TableCell align="left">{company}</TableCell> */}
                          <TableCell align="left">{is_org ? "Organisation" : "User" }</TableCell>
                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                          {/* <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell> */}
                          <TableCell align="right">
                            <UserMoreMenu pk={pk} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
