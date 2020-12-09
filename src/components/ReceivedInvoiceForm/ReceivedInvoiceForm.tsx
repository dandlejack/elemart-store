
import { Button, DatePicker, Input, Select } from 'antd'
import {useEffect,useState} from 'react'
import { CustomerApi } from '../../api/CustomerApi'
import { PaidApi } from '../../api/PaidApi'
import { ProductApi } from '../../api/ProductApi'
import { ReceivedApi } from '../../api/ReceivedApi'
import {EditableTable} from '../EditTable/EditableTable'

interface TableProps {
    column:Array<Object>
}

export const ReceivedInvoiceForm:React.FC<TableProps> = props => {
    const [dataTable, setdataTable] = useState([] as Array<Object>)
    const [invoice, setInvoice] = useState('')
    const [seller, setSeller] = useState('')
    const [customers, setCustomers] = useState([] as Array<Object>)
    const [dateData, setDateData] = useState('')

    useEffect(()=>{
        async function fetchAllCustomer() {
            const response = await CustomerApi.getAllCustomer()
            setCustomers(response)
        }
        fetchAllCustomer()
        return () =>{            
            console.log('unmount')
        }
    },[])
    
    const getTableData = (data:Array<Object>) => {
        setdataTable(data)
    }

    const onSave = async () =>{
        const getProduct = localStorage.getItem('product')
        const allData = {
            invoice_date:dateData,
            invoice_id:'AP'+invoice,
            seller:seller,
            data_table:dataTable,
        }
        const id = await ReceivedApi.insertReceivedInvoice(allData).then(res=>{
            return res._id
        })
        if(getProduct !== null){
            const p = JSON.parse(getProduct)
            dataTable.map((data:any,index:number)=>{
                const filterData = p.filter((pFilter:any) => pFilter._id === data.raw_id)[0]
                filterData.current_amount += data.received_amount
                filterData.history_table.push(id)
                ProductApi.updateProductById(data.raw_id,filterData).then(res=>{
                    window.location.reload()
                })
            })
        }
        
    }

    return (
        <div className='paid-content'>
            <div className='paid-form date-form'>
                <span>วันที่</span>
                <div>
                    <DatePicker format='DD/MM/YYYY' className={'input-width'} onChange={(date,dateString) =>setDateData(dateString)} />
                </div>                
            </div>
            <div className='paid-form invoice-form'>
                <span>หมายเลข Invoice</span>
                <div>
                    <Input addonBefore='AP' className={'input-width'} onChange={e=>setInvoice(e.target.value)} />
                </div>                
            </div>
            <div className='paid-form customer-form'>
                <span>ผู้ขาย</span>
                <div>
                    <Select className={'input-width'} onChange={e=>setSeller(e.toString())}>
                        {customers.map((data:any)=>{
                            return <Select.Option key={data._id} value={data.customer_name}>{data.customer_name}</Select.Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className='paid-form editable-table'>
                <EditableTable column={props.column} getData={getTableData} />
            </div>
            <div >
                <Button type='primary' onClick={onSave}>บันทึก</Button>
            </div>
        </div>
    )
}