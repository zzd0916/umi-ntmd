import React, { Component } from 'react'
import { Modal, Button } from 'antd';

const DictionaryAddModel = (props) => {
    console.log('props', props.visible)
    // const { visible, confirmLoading, ModalText } = props;
    return (
        <Modal
            title={props.title}
            visible={props.visible}
            confirmLoading={props.confirmLoading}
        >
            <p>表单</p>
        </Modal>
    )
}

export default DictionaryAddModel;