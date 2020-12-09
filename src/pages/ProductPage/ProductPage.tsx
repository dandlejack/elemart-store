import { PlusOutlined } from '@ant-design/icons'
import {Button, Input, Layout, Popconfirm, Table} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductApi } from '../../api/ProductApi'
import { CustomModal } from '../../components/CustomModal/CustomModal'
import { ProductForm } from '../../components/ProductForm/ProductForm'
import { productMocks } from '../../mocks/ProductMocks'

const {Header} = Layout

const column = [
    {
        title:'รหัสสินค้า',
        dataIndex:'product_id',
        dataType:'string',
        key:'product_id',
    },
    {
        title:'ชื่อสินค้า',
        dataIndex:'product_name',
        dataType:'string',
        key:'product_name',
    },
    {
        title:'Operation',
        dataIndex:'operation',
        key:'operation',
        render:(text:string,record:any)=><>
        <Link to={'/product/'+record._id}>
            <Button type='primary'>ดูรายละเอียด</Button>
        </Link>
        </>
    }
]

export const ProductPage:React.FC = () => {
    const [dataSource, setDataSource] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        const fetchProduct = async() => {
            const res = await ProductApi.getAllProduct()
            setDataSource(res)
        }
        fetchProduct()
        return () => {
            console.log('unmount')
        }
    }, [])

    const handleClose = () =>{
        setModalVisible(false)
    }
    return <div key='invoice-page' className={'invoice-page'}>
    <div style={{ marginTop: 15 }}>
        <div style={{ display: 'inline-flex', marginLeft: 15, alignItems: 'center' }}>
            <label>ค้นหา</label>
            <Input />
        </div>
        <div style={{ display: 'inline-block', float: 'right', marginRight: 15 }}>
            <Button type='primary' onClick={e => setModalVisible(true)}><PlusOutlined twoToneColor="#eb2f96" /></Button>
        </div>
    </div>
    <CustomModal modalTitle='ลูกค้า' modalType="received-invoice" modalForm={<ProductForm />} modalWidth={1400} modalVisible={modalVisible} getClose={handleClose} />
    <Table
        style={{ margin: '15px 15px' }}
        bordered
        columns={column}
        dataSource={dataSource}
        pagination={{
            pageSize: 50
        }}            
    />
</div>
}