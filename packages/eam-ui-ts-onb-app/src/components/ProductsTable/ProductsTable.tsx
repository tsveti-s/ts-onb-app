import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Column,
  Editing,
  FilterRow,
  HeaderFilter,
  NuvoDataGrid,
} from "@nuvolo/nuux/components/NuvoDataGrid";
import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
import { getAllProducts, deleteProduct } from "src/services/productService";
import { ColumnType } from "src/types/columnTypes";

const Container = styled.div`
  height: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

const DataGrid = styled(NuvoDataGrid)`
  .dx-data-row .highlightedCell {
    color: #0e9ecc;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  margin-top: 20px;
`;

const columnMap: ColumnType[] = [
  {
    columnName: "name",
    columnLabel: "Name",
    columnType: "string",
    visible: true,
  },
  {
    columnName: "price",
    columnLabel: "Price",
    columnType: "string",
    visible: true,
  },
  {
    columnName: "quantity",
    columnLabel: "Quantity",
    columnType: "string",
    visible: true,
  },
];

export const ProductTable = (): JSX.Element => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    getAllProducts(setTableData);
  }, []);

  const handleReload = (): void => {
    setTableData(null);
    getAllProducts(setTableData);
  };

  const handleRowRemoved = (e: any) => {
    console.log("Row is removed!", e.data.id);
    if (e.data.id) {
      deleteProduct(e.data.id, handleReload);
    }
  };

  const handleRowClicked = () => {
    console.log("Row is clicked!");
  };

  return !tableData ? (
    <NuvoThrobber size="large" />
  ) : (
    <Container>
      <DataGrid
        keyExpr="id"
        showBorders
        columnAutoWidth
        repaintChangesOnly
        onRowRemoving={handleRowRemoved}
        onRowClick={handleRowClicked}
        dataSource={tableData as any}
      >
        <FilterRow visible />
        <HeaderFilter allowSearch visible />
        <Editing allowDeleting confirmDelete />
        {columnMap.map((c: ColumnType, index: number) => (
          <Column
            key={index}
            groupIndex={c.groupIndex}
            caption={c.columnLabel}
            dataField={c.columnName}
            dataType={c.columnType}
            visible={c.visible}
            format={c.format}
            cssClass={c.cssClass}
            alignment={c.alignment}
          />
        ))}
      </DataGrid>
    </Container>
  );
};
