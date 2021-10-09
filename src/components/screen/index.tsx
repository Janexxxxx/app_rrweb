import * as React from 'react'
import { Modal } from 'antd-mobile';
import { sOpenURL } from '@/utils/appBridge'
import './style.scss'


interface PointModalProps  {
  showPointModal: boolean
  changeModal :any
  myConfirm: any
  myCancel: any
  contentText: string
  buttonTextLeft: string
  buttonTextRigth: string
  titleText: string
  param?: any
  addContentText?: string
  history?: any
}

let initState = {
}

interface PointModalState {
}

class PointModal extends React.Component<PointModalProps,PointModalState>{
  public state = initState

  componentDidMount() {
  }

  public handleCancel = async  () => {
    await this.props.changeModal(false)
    this.props.myCancel()
  }

  public handleOk = async() => {
    await this.props.changeModal(false)
    this.props.myConfirm()
  }
  
  public contarctShow = () => {
    const {param} = this.props
    sOpenURL(param)
    this.props.changeModal(false)
  }
  public goMy = async() => {
    await this.props.changeModal(false)
    this.props.history.push('/my')
  }
  
  public render() {
    const { contentText, buttonTextLeft, buttonTextRigth, titleText, addContentText} = this.props
    return (
      <Modal
          className="point-modal"
          visible={this.props.showPointModal}
          transparent
          maskClosable={false}
          title={
            <div className="title">{titleText}</div>
          }
          footer={[
            {
              text: buttonTextLeft,
              onPress:this.handleCancel
            },
            {
              text: buttonTextRigth,
              onPress:this.handleOk
            },
          ]}
        >
          <div className="text" >
            <div>{contentText}</div>
            {(addContentText==='agreement')&&<div>
              社保代办服务由江苏邦芒服务外包有限公司提供，请查看<span className="text-a" onClick={this.contarctShow}>《个人劳务事务代理协议书》</span>并完成签约。
            </div>}
            {(addContentText==='repeat')&&<div className="repeat">
              <div>该参保人此月份已提交过订单，如需继续下单，请重新选择缴费月份，</div>
              <div>或请在<span className="text-a" onClick={this.goMy}>「我的订单」</span>页面中先删除</div>
              <div>已提交未支付的当月订单。</div>
            </div>}
          </div>
        </Modal>
    )
  }
}

export default PointModal
