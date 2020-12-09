import { Table, Card, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { PaidApi } from '../../api/PaidApi'
import { ReceivedApi } from '../../api/ReceivedApi'
import { receivedColumn } from '../../mocks/ColumnMocks'
import './style.css'
interface ReceivedProps {
    createdDate: Date
    seller: string
    data_table: Array<Object>
    invoice_date: string
    invoice_id: string
    updateDate: Date
    _id: string
}
export const ReceivedInfo: React.FC<{ match: any }> = ({ match }) => {
    const [dataSource, setDataSource] = useState({} as ReceivedProps)
    useEffect(() => {
        const { id } = match.params;
        const getPaidFromId = async (id: string) => {
            const res = await ReceivedApi.getReceivedInvoiceById(id)
            setDataSource(res[0])
        }
        getPaidFromId(id.toString())
        return () => {

        }
    }, [match])

    return <>
        <div className='paid-content'>
            <Card>
                <Descriptions title={`${dataSource.invoice_id}`} layout="vertical" bordered>
                    <Descriptions.Item label='วันที่'>{dataSource.invoice_date}</Descriptions.Item>
                    <Descriptions.Item label='ลูกค้า'>{dataSource.seller}</Descriptions.Item>
                </Descriptions>
                <div className='paid-form editable-table'>
                    <Table columns={receivedColumn} dataSource={dataSource.data_table} bordered pagination={false} />
                </div>
            </Card>
        </div>
    </>
}