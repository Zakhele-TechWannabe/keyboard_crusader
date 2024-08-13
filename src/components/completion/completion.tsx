'use client'
import React from 'react';
import { Layout, Menu, List, Avatar, Typography, Badge } from 'antd';
import { BugOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const workItems = [
    {
        id: '#56911',
        title: 'Level 1',
        project: 'MyProject',
        status: 'Resolved',
        icon: <TrophyOutlined style={{ color: 'purple' }} />,
        updated: 'Updated Thursday',
    },
];

const Completion = () => {
    return (
        <Layout style={{width: '100%', height: 500}}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1">
                        <span>Shesha</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span>New organization</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>boxfusion</Text>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: '#fff',
                    }}
                >
                    <Text strong>My work items</Text>
                    <List
                        itemLayout="horizontal"
                        dataSource={workItems}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.icon}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={`${item.id} in ${item.project}`}
                                />
                                <div>
                                    <Badge
                                        status={
                                            item.status === 'Active'
                                                ? 'processing'
                                                : item.status === 'Resolved'
                                                ? 'success'
                                                : item.status === 'New'
                                                ? 'default'
                                                : 'error'
                                        }
                                        text={item.status}
                                    />
                                    <div>{item.updated}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Completion;
