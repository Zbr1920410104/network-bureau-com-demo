import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_WRITE_THESIS_LIST,
  DELETE_THESIS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/staff/util/verify-status-to-color';
import scoreToColor from '@/components/home/staff/util/score-to-color';
import moment from 'moment';

import ModifyThesisContent from '@/components/home/staff/thesis/Modify-thesis-content-controller.jsx';
import CreateThesisContent from '@/components/home/staff/thesis/Create-thesis-content-controller.jsx';
import UploadThesisContent from '@/components/home/staff/thesis/Upload-thesis-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Modal, Icon, Descriptions, Skeleton, Tag, Alert } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { changeThesis } = useSelector((state) => state.userStore),
    [writeThesisList, setWriteThesisList] = useState([]),
    [writeThesisLoading, setWriteThesisLoading] = useState(false),
    dispatch = useDispatch(),
    [score, setScore] = useState(0),
    [newThesisVisible, setNewThesisVisible] = useState(false),
    [modifyThesisVisible, setModifyThesisVisible] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [uploadThesisVisible, setUploadThesisVisible] = useState(false);

  const showNewThesisModal = () => {
    setNewThesisVisible(true);
  };

  const hideNewThesisModal = () => {
    dispatch(userAction.setThesisRefresh(true));
    setNewThesisVisible(false);
  };

  const showModifyThesisModal = (uuid) => {
    dispatch(userAction.setStaffThesisUuid(uuid));
    setModifyThesisVisible(true);
  };

  const hideModifyThesisModal = () => {
    dispatch(userAction.setStaffThesisUuid(''));
    setModifyThesisVisible(false);
  };

  const showUploadThesisModal = (uuid) => {
    dispatch(userAction.setStaffThesisUuid(uuid));
    setUploadThesisVisible(true);
  };

  const hideUploadThesisModal = () => {
    dispatch(userAction.setStaffThesisUuid(''));
    setUploadThesisVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_THESIS, { uuid }, 'DELETE');
    if (res) {
      dispatch(userAction.setChangeThesis(true));
    }
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setWriteThesisLoading(true);

        const writeThesisList = await proxyFetch(
          GET_WRITE_THESIS_LIST,
          {},
          'GET'
        );

        if (writeThesisList) {
          setWriteThesisList(writeThesisList);
          setNewThesisVisible(false);
          setModifyThesisVisible(false);
          setUploadThesisVisible(false);
          dispatch(userAction.setChangeThesis(false));

          let tempScore = 0;
          const sum = writeThesisList.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.score;
          }, tempScore);
          setScore(sum.toFixed(2));
        }

        setIsNeedRefresh(false);
        setWriteThesisLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  useEffect(() => {
    if (changeThesis) {
      setIsNeedRefresh(true);
      dispatch(userAction.setChangeThesis(false));
    }
  }, [changeThesis, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='book' className='icon' />
          <span>论文/专著</span>
          <Tag className='content-tag' color={scoreToColor(score)}>
            {`总评分:${score}`}
          </Tag>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewThesisModal}
        >
          新增论文/专著
        </Button>
      </div>
      <Modal
        title='新增论文/专著'
        visible={newThesisVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideNewThesisModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
        okText='确定'
        cancelText='取消'
      >
        <CreateThesisContent />
      </Modal>
      <Modal
        title='修改论文/专著'
        visible={modifyThesisVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开修改内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideModifyThesisModal();
            },
            onCancel() {},
          });
        }}
        okText='确定'
        cancelText='取消'
      >
        <ModifyThesisContent />
      </Modal>
      <Modal
        title='上传附件'
        visible={uploadThesisVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '确认文件已保存后离开,否则文件无法保存',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideUploadThesisModal();
            },
            onCancel() {},
          });
        }}
        okText='保存'
        cancelText='取消'
      >
        <UploadThesisContent />
      </Modal>
      <div className='write-description-box'>
        <Skeleton loading={writeThesisLoading}>
          {writeThesisList?.length ? (
            writeThesisList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className='write-description-title'>
                      <div className='description-title-text'>
                        <span>{`论文/专著${index + 1}:  ${
                          item.thesisTitle
                        }`}</span>
                        <Tag
                          className='content-tag'
                          color={verifyStatusToColor(item.isVerify)}
                        >
                          {item.isVerify}
                        </Tag>
                        <Tag
                          className='content-tag'
                          color={scoreToColor(item.score)}
                        >
                          {item.score ? `评分:${item.score}` : '未评分'}
                        </Tag>
                        {/* <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span> */}
                      </div>
                      <div className='description-title-button'>
                        <Button
                          type='link'
                          onClick={() => {
                            showModifyThesisModal(item.uuid);
                          }}
                          className='link-button'
                          disabled={item.isVerify === '核实通过'}
                          icon='edit'
                        >
                          <span>修改</span>
                        </Button>
                        <Button
                          type='link'
                          className='link-button'
                          icon='delete'
                          disabled={item.isVerify === '核实通过'}
                          onClick={() => {
                            confirm({
                              title: '删除论文/专著?',
                              okType: 'primary',
                              content: '确认要删除论文/专著?',
                              okText: '确认',
                              cancelText: '取消',
                              onOk() {
                                handleDelete(item.uuid);
                              },
                              onCancel() {},
                            });
                          }}
                        >
                          <span>删除</span>
                        </Button>
                      </div>
                    </div>
                    {item.verifyRemarks ? (
                      <Alert
                        type='warning'
                        description={`修改建议: ${item.verifyRemarks}`}
                      />
                    ) : null}
                  </div>
                }
              >
                <Descriptions.Item label='类型'>
                  {item.thesisType}
                </Descriptions.Item>
                <Descriptions.Item label='发表时间'>
                  {item.thesisTime
                    ? moment(item.thesisTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                {item.thesisType === '论文' ? (
                  <>
                    <Descriptions.Item label='发表期刊名称'>
                      {item.thesisJournal}
                    </Descriptions.Item>
                    <Descriptions.Item label='期刊级别'>
                      {item.thesisGrade}
                    </Descriptions.Item>
                    <Descriptions.Item label='论文索引号'>
                      {item.thesisCode}
                    </Descriptions.Item>
                  </>
                ) : null}
                <Descriptions.Item label='第一作者'>
                  {item.thesisFirstAuthor}
                </Descriptions.Item>
                <Descriptions.Item label='提交人作者次序'>
                  {item.thesisAuthorSequence}
                </Descriptions.Item>
                <Descriptions.Item label='上传/查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadThesisModal(item.uuid);
                    }}
                    className='link-button'
                  >
                    <Icon type='upload' />
                    <span>上传/查看</span>
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写论文/专著</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
