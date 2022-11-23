import { makeStyles } from '@material-ui/core';
import { GridColumns, DataGrid, GridRowsProp } from '@material-ui/data-grid';
import React from 'react';

interface IProps {
  columns: GridColumns,
  rows: GridRowsProp,
  page?: number,
  pageSize?: number,
  rowCount: number,
  orderBy: string,
  sort: 'asc' | 'desc',
  onChange: (params: advancedFilterModels.BaseFilter) => any,
  disableColumnMenu?: boolean,
}

const useStyles = makeStyles({
  root: {
    colCell: {
      flex: 1,
      minWidth: "1px !important",
      maxWidth: "none !important"
    },
    viewport: {
      "& .rendering-zone": {
        width: "initial !important",
        maxWidth: "initial !important"
      }
    },
    row: {
      width: "100% !important"
    },
    colCellWrapper: {
      display: "flex"
    },
    cell: {
      flex: 1,
      minWidth: "1px !important",
      maxWidth: "none !important",
      "&:last-of-type": {
        minWidth: "0 !important",
        flex: 0
      }
    }
  },
});

const DataTable: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const onPage = (page: number) => {
    if (props.pageSize === 100) { return; }

    const baseFilter: advancedFilterModels.BaseFilter = {
      orderBy: props.orderBy,
      page: page,
      pageSize: props.pageSize || 10,
      sort: props.sort,
    };

    props.onChange(baseFilter);
  };

  return (
    <div className="datatable">
      <DataGrid
        className={classes.root}
        paginationMode="server"
        sortingMode="server"

        rows={props.rows}
        columns={props.columns.map((o: any) => ({ ...o, sortable: false, editable: false, filterable: false }))}

        pagination
        pageSize={props.pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        rowCount={props.rowCount}

        sortModel={[{
          field: props.orderBy,
          sort: props.sort
        }]}

        onPageChange={onPage}

        disableExtendRowFullWidth
        disableColumnFilter
        disableColumnSelector
        disableSelectionOnClick
        disableColumnMenu
      />
    </div>
  );

};

export default DataTable;
