import { Table, Card, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { PaidApi } from '../../api/PaidApi'
import { paidColumn } from '../../mocks/ColumnMocks'
import './style.css'
interface PaidProps {
    createdDate: Date
    customer_name: string
    data_table: Array<Object>
    invoice_date: string
    invoice_id: string
    updateDate: Date
    _id: string
}
export const PaidInfo: React.FC<{ match: any }> = ({ match }) => {
    const [dataSource, setDataSource] = useState({} as PaidProps)
    useEffect(() => {
        const { id } = match.params;
        const getPaidFromId = async (id: string) => {
            const res = await PaidApi.getPaidInvoiceById(id)
            setDataSource(res[0])
        }
        getPaidFromId(id.toString())
        return () => {

        }
    }, [match])

    const summaryData = (pageData: any) => {
        let summary = 0;
          pageData.forEach((data: any) => {
            summary += Number.parseFloat(data.total_price);
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>-</Table.Summary.Cell>
                <Table.Summary.Cell index={3}>-</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>{summary}</Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );        
      };

    return <>
        <div className='paid-content'>
            <Card>
                <Descriptions title={`${dataSource.invoice_id}`} layout="vertical" bordered>
                    <Descriptions.Item label='วันที่'>{dataSource.invoice_date}</Descriptions.Item>
                    <Descriptions.Item label='ลูกค้า'>{dataSource.customer_name}</Descriptions.Item>
                </Descriptions>
                <div className='paid-form editable-table'>
                    <Table 
                        columns={paidColumn} 
                        dataSource={dataSource.data_table} 
                        bordered 
                        pagination={false}
                        summary={tableData=>summaryData(tableData)}
                    />
                </div>
            </Card>
        </div>
    </>
}