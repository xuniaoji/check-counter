import axios from 'axios'
const httpService = (
  serviceName,
  {
    params,
    errorText = '网络超时,请重试'
    // closeLoading = true,
    // haveCloseLoading = true
  } = {}
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
  console.log(11111)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      // url: `http://192.168.1.74:8199/http-service-engine/callServiceByJson/${serviceName}`,
      url: `http://192.168.1.115:8199/http-service-engine/callServiceByJson/${serviceName}`,
      data: queryParams,
      timeout: 15000
    })
      .then(
        response => {
          console.log(response)
          const resp = response.data.Service
          if (resp.Header.RetCode === '000000') {
            resolve(resp.Body)
          } else {
            console.log('wrong')
            reject(resp.Header.RetMsg)
          }
        },
        errorResp => {
          console.log(22222222)
          console.warn(errorResp)
          reject(errorResp)
        }
      )
      .catch(errorResp => {
        console.log(22222222)
        console.warn(errorResp)
      })
      .finally(() => {
        alert(11)
      })
  })
}

export { httpService }
