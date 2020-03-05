【所有接口均需要参数  userId, openId】

- 体质测试
【获取体质测试试题】
    url:
        /physical/test
    param: 
        无

【提交体质测试分数】
    url:
        /physical/answer
    param:
        {
            "url": "/physical/answer",
            "data": {
                "answer": [
                    {
                        "id": 1,
                        "score": 3
                    },
                    {
                        "id": 2,
                        "score": 3
                    },
                    {
                        "id": 3,
                        "score": 3
                    }.......
                ]
            }
        }

- 首页
【获取首页数据】
    url:
        /home
    param:
        无

【个人档案 = 体质详情】
    url:
        /home/physicalinfo
    param:
        无

【每日宜忌详情】
    url:
        /home/should_avoid
    param:
        无

- 动态
【全部动态列表】
    url:
        /square/activity
    param:
        无

【动态详情】
    url:
        /square/activity
    param:
        id：动态id

【获取个人动态列表】
    url:
        /square/user/activity
    param:
        无

【发布动态】
    url:
        /square/activity/add
    param:
        content: 动态文本内容
        imgs: 上传的图片---------上传图片接口暂无，暂时传字符串数组  [""]

【删除动态】
    url:
        /square/activity/delete
    param:
        id: 动态id

【喜欢/点赞】
    url:
        /like
    param:
        likeId: 喜欢的东西的id
        class: 表示动态还是推文   动态 - 1   推文 - 0

- 调养
【获取常见疾病列表】
    url:
        /disease/list
    param:
        无

【疾病详情】
    url:
        /disease/detail
    param:
        id: 疾病id

【食物详情】
    url:
        /food/detail
    param:
        id: 食物id

- 我的
【我的个人信息】
    url:
        /my
    param:
        无

【需要在前端获取用户的头像昵称信息传给后端，用来更新用户信息】
    url:
        /update_baseinfo
    param:
        nickName: 用户昵称
        avatar: 用户头像链接

【我喜欢的】
    url:
        /my/like
    param:
        无

【反馈】
    url:
        /feedback
    param:
        content: 反馈的文本信息