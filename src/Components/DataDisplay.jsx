import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Rating} from '@mui/material';
import {EditOutlined, DeleteForeverOutlined} from '@mui/icons-material';

export default function DataDisplay({data, edit, remove}) {
  const columns = [
    {
      field: 'icons',
      headerName: '',
      width: 100,
      valueGetter: ({row: {rating, skill}}) => {
        return `${rating} ${skill}`;
      },
      renderCell: ({value}) => (
        <>
          <IconButton onClick={() => edit(value)}><EditOutlined /></IconButton>
          <IconButton onClick={() => remove(value)}><DeleteForeverOutlined /></IconButton>
        </>
      )
    },
    {
      field: 'skill',
      headerName: 'Skill',
      width: 200,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 150,
      renderCell: ({id, value}) => (
        <Rating name={`rating-${id}`} value={Number(value)} readOnly />
      ),
    },
  ];

  const sorting = {
    sorting:{
      sortModel: [{field: 'rating', sort: 'desc'}],
    }
  };

  return (
    <DataGrid autoHeight rows={data} columns={columns} initialState={sorting} disableSelectionOnClick />
  )
}
