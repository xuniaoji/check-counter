import dayjs from 'dayjs'

function addAxiosHeadParams(params) {
  const mDate = dayjs().format('YYYYMMDD')
  const mTime = dayjs().format('HHmmssSSS')
  const businessDatas = {}
  businessDatas['SourceSysId'] = 'test'
  businessDatas['ConsumerId'] = 'C08'
  businessDatas['ServiceCode'] = 'test'
  businessDatas['ServiceName'] = 'test'
  businessDatas['TranCode'] = '888000' // 交易码 N
  businessDatas['GlobalSeq'] = '85C08' + mDate + mTime
  businessDatas['TranSeq'] = 'C08' + mDate + mTime
  businessDatas['Channel'] = '01'
  businessDatas['TranTeller'] = 'test'
  businessDatas['TranDate'] = mDate
  businessDatas['TranTime'] = mTime
  businessDatas['LocalLang'] = 'test'
  businessDatas['BranchId'] = '801032'
  businessDatas['LegalRepCode'] = 'test'

  params.Service.Header = Object.assign({}, businessDatas)
  return params
}
