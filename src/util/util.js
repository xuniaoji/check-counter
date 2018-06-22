/* import axios from 'axios'
// import store from '../store/store'
import { Toast } from 'vant'

const httpService = (
  serviceName,
  { params, errorText = '网络超时,请重试' } = {}
) => {
  const now = new Date()
  const mDate = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
  const mTime = '11111aa'
  const businessDatas = {}
  businessDatas['SourceSysId'] = 'test'
  businessDatas['ConsumerId'] = 'C08'
  businessDatas['ServiceCode'] = 'test'
  businessDatas['ServiceName'] = 'test'
  businessDatas['TranCode'] = '888000' // 交易码 N
  businessDatas['GlobalSeq'] = '85C08' + mDate + mTime
  businessDatas['TranSeq'] = 'C08'
  businessDatas['Channel'] = '01'
  businessDatas['TranTeller'] = 'test'
  businessDatas['TranDate'] = mDate
  businessDatas['TranTime'] = mTime
  businessDatas['LocalLang'] = 'test'
  businessDatas['BranchId'] = 'Branch'
  businessDatas['LegalRepCode'] = 'test'
  const queryParams = {
    Service: {
      Body: params,
      Header: Object.assign({}, businessDatas)
    }
  }

  // store.commit('changeShow')
  Toast.allowMultiple()
  const toast1 = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '正在获取数据'
  })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `http://192.168.1.74:8199/http-service-engine/callServiceByJson/${serviceName}`,
      data: queryParams,
      timeout: 15000
    })
      .then(
        response => {
          console.log(response)
          const resp = response.data.Service
          if (
            resp.Header.RetCode === '000000' &&
            'cardPartyName' in resp.Body
          ) {
            resolve(resp.Body)
          } else if (
            resp.Header.RetCode === '000000' &&
            !('cardPartyName' in resp.Body)
          ) {
            Toast.fail('未查到数据,请确认银行卡号')
            resolve(resp.Body)
          } else {
            console.log(resp)
            Toast.fail('获取数据失败,请重试')
            reject(resp.Header.RetMsg)
          }
        },
        errorResp => {
          Toast.fail(errorText)
          reject(errorResp)
        }
      )
      .finally(() => {
        // store.commit('changeShow')
        toast1.clear()
      })
  })
}

export { httpService } */

import axios from 'axios'
// import store from '../store/store'
import { Toast } from 'vant'

const now = new Date()
const mDate = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
const mTime = '11111aa'
const businessDatas = {}
businessDatas['SourceSysId'] = 'test'
businessDatas['ConsumerId'] = 'C08'
businessDatas['ServiceCode'] = 'test'
businessDatas['ServiceName'] = 'test'
businessDatas['TranCode'] = '888000' // 交易码 N
businessDatas['GlobalSeq'] = '85C08' + mDate + mTime
businessDatas['TranSeq'] = 'C08'
businessDatas['Channel'] = '01'
businessDatas['TranTeller'] = 'test'
businessDatas['TranDate'] = mDate
businessDatas['TranTime'] = mTime
businessDatas['LocalLang'] = 'test'
businessDatas['BranchId'] = 'Branch'
businessDatas['LegalRepCode'] = 'test'

// store.commit('changeShow')
Toast.allowMultiple()
let toast1
const Axios = axios.create({
  baseURL: `http://192.168.1.75:8199/http-service-engine/callServiceByJson/`,
  timeout: 15000,
  responseType: 'json',
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  }
})

Axios.interceptors.request.use(
  config => {
    config.data = {
      Service: { Body: config.data, Header: Object.assign({}, businessDatas) }
    }
    toast1 = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '正在获取数据'
    })
    return config
  },
  error => {
    toast1.clear()
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    console.log(response)
    const resp = response.data.Service
    if (resp.Header.RetCode === '000000' && 'cardPartyName' in resp.Body) {
      return resp.Body
    } else if (
      resp.Header.RetCode === '000000' &&
      !('cardPartyName' in resp.Body)
    ) {
      Toast.fail('未查到数据,请确认银行卡号')
      return resp.Body
    } else {
      Toast.fail('获取数据失败,请重试')
      Promise.reject(resp.Header.RetMsg)
    }
  },
  errorResp => {
    toast1.clear()
    Promise.reject(errorResp)
  }
)

export default Axios
