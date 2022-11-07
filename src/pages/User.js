import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// material
import { Card, Stack, Container, Typography, Menu, MenuItem, Button } from '@mui/material';
// components
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActiveOrDeleteUserFrom } from '../forms/UserForm';
import { activeUser, deleteUser, getUsers, bulkUpdateUsers } from '../services/user.service';
import Page from '../components/Page';
import LoadingIndicator from '../components/common/LoadingSpinner';

import CustomModal from '../components/common/CustomModal';
import CustomIconButton from '../components/common/CustomIconButton';
import ToastAlert from '../components/common/ToastAlert';
import Iconify from '../components/common/Iconify';

export default function User() {
  const userColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'isActive',
      headerName: 'isActive',
      type: 'boolean',
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      filterable: false,
      disableExport: true,
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const { id, isActive } = params.row;
        return (
          <div>
            {isActive ? (
              <CustomIconButton
                onClick={() => {
                  reset({ userId: [id] });
                  setCountUsersDelete(1);
                  setOpenDeleteModal(true);
                }}
                title="Delete"
                color="error.main"
                icon="eva:trash-2-outline"
              />
            ) : (
              <CustomIconButton
                onClick={async () => {
                  const { status } = await activeUser(id);
                  setMessageToast(
                    status === 200
                      ? {
                          message: 'User activated successfully',
                          severity: 'success',
                        }
                      : {
                          message: 'Error activating user',
                          severity: 'error',
                        }
                  );
                  setOpenToast(true);
                  if (status === 200) {
                    fetchUsers();
                  }
                }}
                title="Activate"
                color="primary.main"
                icon="eva:checkmark-circle-outline"
              />
            )}
          </div>
        );
      },
    },
  ];

  const multipleUserActions = [
    {
      label: 'Delete',
      icon: 'eva:trash-2-outline',
      color: 'error.main',
      onClick: () => {
        reset({ userId: selectedUsers });
        setCountUsersDelete(selectedUsers.length);
        handleMenuOptionsClose();
        setOpenDeleteModal(true);
      }
    },
    {
      label: 'Activate',
      icon: 'eva:checkmark-circle-outline',
      color: 'primary.main',
      onClick: () => {
        reset({ userId: selectedUsers });
        setCountUsersActive(selectedUsers.length);
        handleMenuOptionsClose();
        setOpenActivateModal(true);
      }
    },
  ]

  const initialStateGrid = {
    filter: {
      filterModel: {
        items: [{ columnField: 'isActive', operatorValue: 'is', value: 'true' }],
      },
    },
  };

  const deleteForm = {
    schema: Yup.object().shape({
      userId: Yup.array().required('User id is required'),
    }),
    defaultValues: {
      userId: [],
    },
  };

  const formMethods = useForm({
    resolver: yupResolver(deleteForm.schema),
    defaultValues: deleteForm.defaultValues,
  });

  const { reset } = formMethods;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [messageToast, setMessageToast] = useState({});
  const [countUsersDelete, setCountUsersDelete] = useState(0);
  const [countUsersActive, setCountUsersActive] = useState(0);
  const [multiSelectAnchorEl, setMultiSelectAnchorEl] = useState(null);
  const open = Boolean(multiSelectAnchorEl);

  const handleMenuOptionsClick = (event) => {
    setMultiSelectAnchorEl(event.currentTarget);
  };

  const handleMenuOptionsClose = () => {
    setMultiSelectAnchorEl(null);
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    if (users) setUsers(users);
    setLoading(false);
  };

  const onSubmitDelete = async (data) => {
    const { userId } = data;
    const isMultipleDelete = userId.length > 1;
    const updateValues = isMultipleDelete ? {
      ids: userId,
      isActive: false,
    } : userId[0];

    
    const { status } = isMultipleDelete ? await bulkUpdateUsers(updateValues) : await deleteUser(updateValues);
    const isSuccessfullyResponse = status === 200;
    setMessageToast(
      isSuccessfullyResponse
        ? { message: `Users successfully deleted`, severity: 'success' }
        : { message: 'Error on delete the users', severity: 'error' }
    );
    setOpenToast(true);
    if (isSuccessfullyResponse) {
      fetchUsers();
    }

    setOpenDeleteModal(false);
    setCountUsersDelete(0);
  };

  const onSubmitActivate = async (data) => {
    const { userId } = data;
    const updateValues =  {
      ids: userId,
      isActive: true,
    } 
  
    const { status } =  await bulkUpdateUsers(updateValues);
    const isSuccessfullyResponse = status === 200;
    setMessageToast(
      isSuccessfullyResponse
        ? { message: `Users successfully activate`, severity: 'success' }
        : { message: 'Error on delete the users', severity: 'error' }
    );

    setOpenToast(true);
    if (isSuccessfullyResponse) {
      fetchUsers();
    }

    setOpenActivateModal(false);
    setCountUsersActive(0);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {selectedUsers.length > 0 && (
            <div>
              <Button
                id="basic-button"
                variant='contained'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuOptionsClick}
                endIcon={open ? <Iconify icon="eva:arrow-up-outline"/> : <Iconify icon="eva:arrow-down-outline" /> }
              >
                Acciones
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={multiSelectAnchorEl}
                open={open}
                onClose={handleMenuOptionsClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
              {
                multipleUserActions.map((action, index) => (
                  <MenuItem key={index} onClick={() => action.onClick()} sx={{color: action.color}}> 
                    {action?.icon ? <Iconify icon={action.icon} /> : null}
                    {action.label}
                  </MenuItem>
                ))
              }
              </Menu>
            </div>
          )}
        </Stack>

        <Card>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div style={{ display: 'flex', height: '70vh' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={users}
                  initialState={initialStateGrid}
                  columns={userColumns}
                  getRowId={(user) => user.id}
                  pageSize={rowsPerPage}
                  onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                  rowsPerPageOptions={[10, 20, 50]}
                  onSelectionModelChange={(usersSelected) => {
                    setSelectedUsers(usersSelected);
                  }}
                  pagination
                  checkboxSelection
                  disableSelectionOnClick
                  components={{ Toolbar: GridToolbar }}
                  getRowHeight={() => 'auto'}
                />
              </div>
            </div>
          )}
        </Card>
      </Container>

      <CustomModal
        title="Delete User"
        description={`Are you sure you want to active ${countUsersDelete} user(s)?`}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        children={
          <ActiveOrDeleteUserFrom
            onSubmit={onSubmitDelete}
            formMethods={formMethods}
            handleCancel={() => setOpenDeleteModal(false)}
            confirmButtonText="Delete"
          />
        }
      />

      <CustomModal
        title="Active User"
        description={`Are you sure you want to active ${countUsersActive} user(s)?`}
        open={openActivateModal}
        handleClose={() => setOpenActivateModal(false)}
        children={
          <ActiveOrDeleteUserFrom
            onSubmit={onSubmitActivate}
            formMethods={formMethods}
            handleCancel={() => setOpenActivateModal(false)}
            confirmButtonText="Active"
          />
        }
      /> 

      <ToastAlert
        open={openToast}
        handleClose={() => setOpenToast(false)}
        message={messageToast.message}
        severity={messageToast.severity}
      />
    </Page>
  );
}
