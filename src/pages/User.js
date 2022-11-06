import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// material
import { Card, Stack, Container, Typography } from '@mui/material';
// components
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteUserForm from '../forms/DeleteUserForm';
import { activateUser, deleteUser, getUsers } from '../services/user.service';
import Page from '../components/Page';
import LoadingIndicator from '../components/common/LoadingSpinner';

import CustomModal from '../components/common/CustomModal';
import CustomIconButton from '../components/common/CustomIconButton';
import ToastAlert from '../components/common/ToastAlert';

const deleteUserModalProps = {
  title: 'Delete User',
  description: 'Are you sure you want delete this user ?',
};

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
        const { id, isActive, email } = params.row;
        return (
          <div>
            {isActive ? (
              <CustomIconButton
                onClick={() => {
                  reset({ userId: id, email });
                  setOpenDeleteModal(true);
                }}
                title="Delete"
                color="error.main"
                icon="eva:trash-2-outline"
              />
            ) : (
              <CustomIconButton
                onClick={async () => {
                  const { id } = params.row;
                  const { status } = await activateUser(id);
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
                  }https://auth.ioet.com/
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

  const initialStateGrid = {
    filter: {
      filterModel: {
        items: [{ columnField: 'isActive', operatorValue: 'is', value: 'true' }],
      },
    },
  };

  const deleteForm = {
    schema: Yup.object().shape({
      userId: Yup.string(),
    }),
    defaultValues: {
      userId: '',
      email: '',
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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [messageToast, setMessageToast] = useState({});

  const fetchUsers = async () => {
    const users = await getUsers();
    if (users) setUsers(users);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    const { userId } = data;
    const { status } = await deleteUser(userId);
    const isSuccessfullyResponse = status === 200;
    setMessageToast(
      isSuccessfullyResponse
        ? { message: 'User successfully deleted', severity: 'success' }
        : { message: 'Error on delete the user', severity: 'error' }
    );
    setOpenToast(true);
    if (isSuccessfullyResponse) {
      reset({ userId: '', email: '' });
      fetchUsers();
    }

    setOpenDeleteModal(false);
  };

  /*   const deleteSelectedUser = async (data) => {
    const { id, } = data;
    const { status } = await deleteUser(id);
    resetUser();
    setOpenEditModal(false);
    setMessageToast(result 
      ? {message: 'User successfully updated', severity:'success'} 
      : {message: 'Error on updating the User', severity:'error'});
    setOpenToast(true);
    await fetchUsers();
  }; */

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
                    const selectedGridUsers = users.filter((user) => usersSelected.includes(user.id));
                    setSelectedUsers(selectedGridUsers);
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
        {...deleteUserModalProps}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        children={
          <DeleteUserForm
            onSubmit={onSubmit}
            formMethods={formMethods}
            handleCancel={() => setOpenDeleteModal(false)}
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
