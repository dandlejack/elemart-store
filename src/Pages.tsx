import {Page} from './types/Page'
import {App} from './App'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { CustomerPage } from './pages/CustomerPage/CustomerPage'
import { PaidInvoicePage } from './pages/PaidInvoicePage/PaidInvoicePage'
import { ReceivedInvoicePage } from './pages/ReceivedPage/ReceivedInvoicePage'
import { PaidInfo } from './components/PaidInfo/PaidInfo'
import { ReceivedInfo } from './components/ReceivedInfo/ReceivedInfo'
import { ProductInfo } from './components/ProductInfo/ProductInfo'

export const Pages:Page[] = [
    {
        title:'หน้าแรก',
        component:ProductPage,
        path:'/',
        show:true,
    },
    {
        title:'รายงานรับ',
        component:ReceivedInvoicePage,
        path:'/received',
        show:true,
    },
    {
        title:'รายงานขาย',
        component:PaidInvoicePage,
        path:'/paid',
        show:true,
    },
    {
        title:'Customer',
        component:CustomerPage,
        path:'/customer',
        show:true,
    },
    {
        title:'รายการขาย',
        path:'/paid/:id',
        component:PaidInfo,
        show:false,
    },
    {
        title:'รายการซื้อ',
        path:'/received/:id',
        component:ReceivedInfo,
        show:false,
    },
    {
        title:'สินค้า',
        path:'/product/:id',
        component:ProductInfo,
        show:false,
    }
]