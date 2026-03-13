
import React, { useState, useRef } from 'react';
import { 
  Download, 
  RefreshCcw, 
  Eye, 
  PlusCircle, 
  CircleCheck, 
  TriangleAlert, 
  X, 
  Search as SearchIcon, 
  WifiOff, 
  MapPin, 
  Clock, 
  Building2, 
  Layers, 
  ExternalLink, 
  ChevronRight, 
  Info, 
  Plus,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  Award,
  Users2,
  CalendarDays,
  Coins,
  FileText
} from 'lucide-react';
import { Tender, SystemLog, SubPackage } from '../types';

const mockTenders: Tender[] = [
  { 
    id: '1', 
    projectId: 'KFFKJ202601',
    title: '国网客服中心2026年第一次服务竞争性谈判框架采购', 
    category: '信通类', 
    type: '服务',
    publishDate: '2024-10-24', 
    deadline: '2026-02-10 16:00:00', 
    openingTime: '2026-03-09 09:00:00',
    openingLocation: '远程线上开标',
    purchaser: '国家电网有限公司客户服务中心',
    status: '正在采购',
    platform: '国网',
    budget: '框架采购',
    subPackages: [
      { 
        id: '1-1', 
        index: 1,
        subBidNumber: 'KFFKJ202601-01',
        subBidName: '呼叫中心运维分标',
        lotNumber: '包1',
        lotName: '业务支撑系统运维服务',
        scope: '负责国网客服中心北方园区业务支撑系统的日常巡检、故障排查、系统优化及重大节日保障。',
        qualifications: '具备ITSS三级及以上资质；具备高新技术企业证书。',
        experience: '近三年至少具有2个省级及以上电力公司呼叫中心运维类业绩。',
        personnel: '项目经理需具备PMP认证，技术团队不少于10人且具备相关技术认证。',
        duration: '365日历天',
        location: '天津市东丽区国网客服中心北方园区',
        maxPrice: '220.00',
        estAmount: '200.00',
        quoteMethod: '总价报折扣'
      },
      {
        id: '1-2',
        index: 2,
        subBidNumber: 'KFFKJ202601-02',
        subBidName: '软件辅助开发分标',
        lotNumber: '包2',
        lotName: '呼叫中心座席辅助软件开发',
        scope: '开发座席侧自动化辅助脚本，集成语义分析引擎，提升首接负责率。',
        qualifications: '具备CMMI3及以上资质；具备软件企业证书。',
        experience: '近三年具有类似座席辅助软件或AI集成开发业绩。',
        personnel: '核心开发人员需具备5年以上Java或Python开发经验。',
        duration: '180日历天',
        location: '远程开发+现场实施',
        maxPrice: '160.00',
        estAmount: '150.00',
        quoteMethod: '总价报固定单价'
      },
      {
        id: '1-3',
        index: 3,
        subBidNumber: 'KFFKJ202601-03',
        subBidName: '网络安全运营分标',
        lotNumber: '包3',
        lotName: '信息安全监控与应急响应',
        scope: '对客服中心南北两个园区的网络安全态势进行7×24小时监控，并提供年度渗透测试及应急响应服务。',
        qualifications: '具备CISP或CCRC等级保护测评机构资质；已通过等保三级认证。',
        experience: '近三年承接过省级以上国有单位网络安全运营项目不少于2项。',
        personnel: '安全运营人员不少于6名，其中高级工程师2名，持有CISSP或CISP证书。',
        duration: '365日历天',
        location: '天津/北京双中心远程+现场',
        maxPrice: '98.00',
        estAmount: '90.00',
        quoteMethod: '年费总价承包'
      },
      {
        id: '1-4',
        index: 4,
        subBidNumber: 'KFFKJ202601-04',
        subBidName: '数据治理分标',
        lotNumber: '包4',
        lotName: '客户数据质量治理平台建设',
        scope: '建设覆盖数据采集、清洗、比对、修复全流程的客户主数据治理平台，支撑95598业务数据质量提升。',
        qualifications: '具备数据管理能力成熟度（DCMM）3级及以上评估证书。',
        experience: '近三年具有电力或金融行业大规模客户数据治理平台交付业绩。',
        personnel: '项目经理具备数据架构师认证，数据工程师不少于8名。',
        duration: '270日历天',
        location: '远程交付+天津园区现场部署',
        maxPrice: '310.00',
        estAmount: '290.00',
        quoteMethod: '总价固定总价'
      },
      {
        id: '1-5',
        index: 5,
        subBidNumber: 'KFFKJ202601-05',
        subBidName: '智能质检分标',
        lotNumber: '包5',
        lotName: '语音质检AI系统升级改造',
        scope: '对现有语音质检系统进行AI大模型改造，实现全量通话自动质检，替代现有人工抽检模式。',
        qualifications: '具备人工智能类软件著作权及ISO 27001认证。',
        experience: '具有呼叫中心智能质检系统成功交付案例，单项目规模不低于百万级通话量。',
        personnel: '算法工程师不少于4名，需有NLP或ASR方向技术背景。',
        duration: '150日历天',
        location: '全程远程交付',
        maxPrice: '185.00',
        estAmount: '175.00',
        quoteMethod: '总价报固定单价'
      },
      {
        id: '1-6',
        index: 6,
        subBidNumber: 'KFFKJ202601-06',
        subBidName: '知识库建设分标',
        lotNumber: '包6',
        lotName: '95598业务知识图谱与检索平台',
        scope: '建设面向95598坐席的智能知识库，涵盖业务规则、FAQ、操作手册，支持语义检索与多轮对话引导。',
        qualifications: '具备知识图谱或企业搜索相关软件产品著作权。',
        experience: '近三年具有电力或公用事业类知识库平台建设案例。',
        personnel: '知识工程师不少于3名，平台架构师1名。',
        duration: '120日历天',
        location: '远程交付+现场培训',
        maxPrice: '75.00',
        estAmount: '70.00',
        quoteMethod: '总价报折扣'
      },
      {
        id: '1-7',
        index: 7,
        subBidNumber: 'KFFKJ202601-07',
        subBidName: '视频客服分标',
        lotNumber: '包7',
        lotName: '视频坐席平台建设与运营',
        scope: '建设视频客服系统，支持高清视频通话、双向文件传输及远程操控引导，覆盖业扩报装全流程视频化办理。',
        qualifications: '具备视频通信或融合通信相关资质，产品须获得泰尔实验室检测认证。',
        experience: '具有省级以上公共事业单位视频客服平台建设案例。',
        personnel: '视频平台工程师不少于4名，运营专员2名。',
        duration: '200日历天',
        location: '天津南方园区+全国远程坐席接入',
        maxPrice: '240.00',
        estAmount: '225.00',
        quoteMethod: '总价固定总价'
      },
      {
        id: '1-8',
        index: 8,
        subBidNumber: 'KFFKJ202601-08',
        subBidName: '培训体系分标',
        lotNumber: '包8',
        lotName: '坐席技能培训与考核服务',
        scope: '为国网客服中心南北两个园区全体在职坐席提供年度技能提升培训、考核命题及结果分析服务。',
        qualifications: '具备人力资源服务许可证，培训机构在教育主管部门备案。',
        experience: '近三年承接过不少于500人规模的企业坐席培训项目。',
        personnel: '专职培训师不少于5名，均具备高级讲师资格证书。',
        duration: '365日历天',
        location: '天津/北京园区+线上混合授课',
        maxPrice: '55.00',
        estAmount: '50.00',
        quoteMethod: '单价×人次'
      },
      { id: '1-9',  index: 9,  subBidNumber: 'KFFKJ202601-09', subBidName: '现场运营分标',   lotNumber: '包9',  lotName: '客服现场综合运营管理',      scope: '统筹南北园区现场运营秩序管理，含值班排班、现场巡查及突发事件应急处置。', qualifications: '具备企业管理咨询资质或劳务派遣许可证。', experience: '近三年承接过500座席以上呼叫中心现场管理项目。', personnel: '现场运营经理不少于2名，班组长不少于6名。', duration: '365日历天', location: '天津/北京园区', maxPrice: '88.00', estAmount: '82.00', quoteMethod: '年费总价承包' },
      { id: '1-10', index: 10, subBidNumber: 'KFFKJ202601-10', subBidName: '硬件维保分标',   lotNumber: '包10', lotName: 'IT硬件设备维保服务',             scope: '负责南北两园区服务器、存储、网络设备的巡检、故障处理及备件管理，提供7×24小时响应保障。', qualifications: '具备信息系统集成及服务二级及以上资质，主流厂商原厂授权。', experience: '近三年承接大型机房IT运维项目不少于2个。', personnel: '驻场工程师不少于4名，响应时间2小时内。', duration: '365日历天', location: '天津/北京双中心机房', maxPrice: '120.00', estAmount: '112.00', quoteMethod: '年费总价承包' },
      { id: '1-11', index: 11, subBidNumber: 'KFFKJ202601-11', subBidName: '云存储分标',     lotNumber: '包11', lotName: '通话录音云存储与归档服务',        scope: '为客服中心全量通话录音提供合规云存储、检索回放及定期归档服务，满足监管要求。', qualifications: '具备云服务资质（可信云认证），信息系统集成二级及以上。', experience: '近三年承接金融或电力行业录音归档存储项目。', personnel: '云存储架构师1名，运维工程师不少于3名。', duration: '365日历天', location: '北京/天津云数据中心', maxPrice: '95.00', estAmount: '88.00', quoteMethod: '按TB容量月租' },
      { id: '1-12', index: 12, subBidNumber: 'KFFKJ202601-12', subBidName: '网络接入分标',   lotNumber: '包12', lotName: '专线网络接入与带宽保障服务',      scope: '为南北两园区提供高质量互联网专线接入和园区内广域网互联，保障业务连续性。', qualifications: '具备工信部颁发的互联网接入服务许可证（IDC/ISP）。', experience: '近三年向大型呼叫中心提供专线网络接入服务。', personnel: '网络工程师驻场不少于2名，故障恢复时间4小时内。', duration: '365日历天', location: '天津园区+北京园区', maxPrice: '60.00', estAmount: '55.00', quoteMethod: '年费总价承包' },
      { id: '1-13', index: 13, subBidNumber: 'KFFKJ202601-13', subBidName: '外呼平台分标',   lotNumber: '包13', lotName: '智能外呼营销平台建设',             scope: '建设支持AI语音外呼的自动化营销平台，集成意图识别与话术推荐引擎，支持千路并发。', qualifications: '具备电信增值业务许可证（呼叫中心业务），产品通过信通院检测。', experience: '具有国网或南网外呼平台建设或运营案例。', personnel: '算法工程师不少于3名，平台工程师不少于4名。', duration: '180日历天', location: '远程交付+现场部署', maxPrice: '210.00', estAmount: '195.00', quoteMethod: '总价固定总价' },
      { id: '1-14', index: 14, subBidNumber: 'KFFKJ202601-14', subBidName: '智能排班分标',   lotNumber: '包14', lotName: '坐席智能排班与人力预测系统',       scope: '引入AI排班引擎，基于历史话务预测模型自动生成最优排班方案，支持弹性调整。', qualifications: '具备软件著作权，产品已在大型呼叫中心规模化应用。', experience: '近三年具有500座席以上呼叫中心排班系统交付案例。', personnel: '产品经理1名，算法工程师2名，实施顾问2名。', duration: '120日历天', location: '远程交付', maxPrice: '65.00', estAmount: '60.00', quoteMethod: '总价固定总价' },
      { id: '1-15', index: 15, subBidNumber: 'KFFKJ202601-15', subBidName: '满意度分标',     lotNumber: '包15', lotName: '客户满意度调查与分析服务',        scope: '提供电话回访、在线问卷及NPS净推荐值调研，输出客户体验分析报告。', qualifications: '具备市场调查资质，具备数据分析相关软件著作权。', experience: '近三年为省级以上公用事业单位提供满意度调研服务。', personnel: '项目经理1名，数据分析师不少于3名。', duration: '365日历天', location: '远程+现场结合', maxPrice: '40.00', estAmount: '36.00', quoteMethod: '按调研量单价' },
      { id: '1-16', index: 16, subBidNumber: 'KFFKJ202601-16', subBidName: '舆情监控分标',   lotNumber: '包16', lotName: '社交媒体舆情监控与预警服务',      scope: '对微博、微信、抖音等主流平台涉及国网客服的舆情信息进行7×24小时监控与分级预警。', qualifications: '具备互联网信息服务许可证，舆情监控系统已通过等保三级认证。', experience: '近三年承接央企或政府舆情监控服务项目。', personnel: '舆情分析师不少于4名，技术工程师2名。', duration: '365日历天', location: '远程监控', maxPrice: '48.00', estAmount: '44.00', quoteMethod: '年费总价承包' },
      { id: '1-17', index: 17, subBidNumber: 'KFFKJ202601-17', subBidName: '法务支撑分标',   lotNumber: '包17', lotName: '客户投诉法务支撑与合规服务',      scope: '为涉及法律纠纷的客户投诉提供法务审核、证据固化及应诉支持，确保合规处置。', qualifications: '具备法律职业资格，律师事务所或法务咨询机构。', experience: '近三年为大型国有单位提供法务顾问或合规咨询服务。', personnel: '律师不少于3名，合规专员2名。', duration: '365日历天', location: '线上+天津园区驻场', maxPrice: '35.00', estAmount: '30.00', quoteMethod: '年费总价承包' },
      { id: '1-18', index: 18, subBidNumber: 'KFFKJ202601-18', subBidName: '可视化分标',     lotNumber: '包18', lotName: '运营大屏可视化平台建设',           scope: '建设覆盖话务量、服务质量、人力效能的实时运营驾驶舱大屏，支持多屏联动展示。', qualifications: '具备软件开发资质，可视化产品获软件著作权认证。', experience: '近三年具有大型运营中心可视化平台交付案例。', personnel: 'UI设计师2名，前端工程师3名，数据工程师2名。', duration: '90日历天', location: '远程交付+现场安装', maxPrice: '80.00', estAmount: '74.00', quoteMethod: '总价固定总价' },
      { id: '1-19', index: 19, subBidNumber: 'KFFKJ202601-19', subBidName: '心理健康分标',   lotNumber: '包19', lotName: '坐席心理健康干预与关怀服务',      scope: '为南北两园区在职坐席提供心理健康评估、团体辅导及危机干预服务。', qualifications: '具备心理咨询机构资质，持证心理咨询师不少于5名。', experience: '近三年为500人以上规模企业提供员工心理援助项目（EAP）。', personnel: '首席心理咨询师1名，咨询师不少于4名。', duration: '365日历天', location: '天津/北京园区+线上', maxPrice: '28.00', estAmount: '24.00', quoteMethod: '按人次单价' },
      { id: '1-20', index: 20, subBidNumber: 'KFFKJ202601-20', subBidName: '安保服务分标',   lotNumber: '包20', lotName: '园区安全保卫与门禁管理服务',      scope: '负责南北两园区7×24小时安保巡逻、门禁系统管理及突发安全事件处置。', qualifications: '具备保安服务许可证，企业注册资本不低于100万元。', experience: '近三年为大型企业园区提供安保服务，合同金额不低于50万元/年。', personnel: '保安队长2名，保安员不少于20名，均持证上岗。', duration: '365日历天', location: '天津/北京园区', maxPrice: '72.00', estAmount: '66.00', quoteMethod: '年费总价承包' },
      { id: '1-21', index: 21, subBidNumber: 'KFFKJ202601-21', subBidName: '保洁服务分标',   lotNumber: '包21', lotName: '园区保洁与环境卫生管理服务',      scope: '承担南北两园区办公区域、公共区域及机房环境的日常清洁保洁工作。', qualifications: '具备物业服务资质或保洁服务资质。', experience: '近三年为大型企业园区提供保洁服务，单项合同金额不低于30万元/年。', personnel: '保洁主管2名，保洁员不少于15名。', duration: '365日历天', location: '天津/北京园区', maxPrice: '45.00', estAmount: '40.00', quoteMethod: '年费总价承包' },
      { id: '1-22', index: 22, subBidNumber: 'KFFKJ202601-22', subBidName: '餐饮服务分标',   lotNumber: '包22', lotName: '员工餐厅运营管理服务',             scope: '承担南北两园区员工餐厅的日常运营，提供早餐、午餐、晚餐及夜宵服务。', qualifications: '具备餐饮服务许可证，通过食品安全管理体系（ISO 22000）认证。', experience: '近三年为500人以上规模企业提供餐饮服务。', personnel: '厨师长2名，厨师不少于10名，服务员不少于8名。', duration: '365日历天', location: '天津/北京园区员工餐厅', maxPrice: '180.00', estAmount: '165.00', quoteMethod: '按月承包' },
      { id: '1-23', index: 23, subBidNumber: 'KFFKJ202601-23', subBidName: '交通班车分标',   lotNumber: '包23', lotName: '员工通勤班车运营服务',             scope: '提供南北两园区员工上下班通勤班车服务，覆盖周边主要交通枢纽。', qualifications: '具备道路旅客运输经营许可证，车辆须通过年检。', experience: '近三年为大型企业提供员工班车服务。', personnel: '驾驶员不少于10名，均持A2或B2级驾驶证。', duration: '365日历天', location: '天津/北京园区周边路线', maxPrice: '60.00', estAmount: '54.00', quoteMethod: '按车次月租' },
      { id: '1-24', index: 24, subBidNumber: 'KFFKJ202601-24', subBidName: '绿化养护分标',   lotNumber: '包24', lotName: '园区绿化与景观养护服务',           scope: '负责南北两园区室内外绿植、景观的日常养护、修剪及季节性更换。', qualifications: '具备园林绿化施工资质或相关专业资质。', experience: '近三年为大型企业园区提供绿化养护服务。', personnel: '园艺技师不少于2名，养护工人不少于5名。', duration: '365日历天', location: '天津/北京园区室内外', maxPrice: '25.00', estAmount: '22.00', quoteMethod: '年费总价承包' },
      { id: '1-25', index: 25, subBidNumber: 'KFFKJ202601-25', subBidName: '工程维修分标',   lotNumber: '包25', lotName: '园区建筑及设施设备维修服务',       scope: '负责南北两园区水电、空调、消防、弱电及建筑结构的日常维修保养和紧急抢修。', qualifications: '具备建筑工程施工资质或房屋维修资质，相关专业人员持证上岗。', experience: '近三年为大型企业园区提供综合设施维修服务。', personnel: '工程主管2名，水电工、空调工等专业技工不少于10名。', duration: '365日历天', location: '天津/北京园区', maxPrice: '90.00', estAmount: '82.00', quoteMethod: '年费总价承包' }
    ]
  },
  {
    id: '2', 
    projectId: 'SGCC-JZ-2024-05',
    title: '国网江苏电力2024年通信终端运维服务采购项目', 
    category: '信通类', 
    type: '服务',
    publishDate: '2024-10-21', 
    deadline: '2024-11-10 10:00:00', 
    openingTime: '2024-11-11 14:00:00',
    openingLocation: '江苏省南京市鼓楼区南京饭店',
    purchaser: '国网江苏省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '450万元',
    subPackages: [
      {
        id: '2-1',
        index: 1,
        subBidNumber: 'JS-2024-COMM-01',
        subBidName: '苏南运维分标',
        lotNumber: '包1',
        lotName: '苏南地区终端维护',
        scope: '南京、苏州、无锡等地区的通信终端日常维护与备品备件管理。',
        qualifications: '通信工程施工总承包三级及以上资质。',
        experience: '具有地市级电力公司通信专业运维经验。',
        personnel: '驻场工程师不少于5名，需持电工证上岗。',
        duration: '12个月',
        location: '苏南各市供电公司',
        maxPrice: '260.00',
        estAmount: '250.00',
        quoteMethod: '年费总价承包'
      },
      {
        id: '2-2',
        index: 2,
        subBidNumber: 'JS-2024-COMM-02',
        subBidName: '苏北运维分标',
        lotNumber: '包2',
        lotName: '苏北地区终端维护',
        scope: '徐州、淮安、宿迁等地区的通信终端日常巡检、故障处理及备品备件管理。',
        qualifications: '通信工程施工总承包三级及以上资质，具备工信部颁发的电信业务经营许可证。',
        experience: '近三年具有苏北或苏中地区电力通信运维业绩不少于1项。',
        personnel: '驻场工程师不少于4名，持证上岗，响应时间不超过2小时。',
        duration: '12个月',
        location: '苏北各市供电公司',
        maxPrice: '130.00',
        estAmount: '120.00',
        quoteMethod: '年费总价承包'
      },
      {
        id: '2-3',
        index: 3,
        subBidNumber: 'JS-2024-COMM-03',
        subBidName: '设备采购分标',
        lotNumber: '包3',
        lotName: '通信终端设备集中采购',
        scope: '采购ONU、PTN微型设备、工业级交换机等通信终端设备，用于江苏电网通信接入层更新改造。',
        qualifications: '具备工业和信息化部颁发的进网许可证，产品须通过入围测试。',
        experience: '近三年具有省级电力公司通信设备批量供货业绩。',
        personnel: '驻场售后工程师不少于3名，原厂授权服务资质。',
        duration: '90日历天（交货期）',
        location: '江苏省内各地市仓库',
        maxPrice: '60.00',
        estAmount: '55.00',
        quoteMethod: '单价×数量'
      },
      {
        id: '2-4',
        index: 4,
        subBidNumber: 'JS-2024-COMM-04',
        subBidName: '网络优化分标',
        lotNumber: '包4',
        lotName: '骨干传输网络优化调整',
        scope: '对江苏电力骨干SDH/OTN传输网进行拓扑优化、保护路由调整及带宽扩容，提升电网业务承载能力。',
        qualifications: '具备通信网络系统集成甲级资质或信息系统集成及服务一级资质。',
        experience: '近三年承接省级以上骨干传输网络优化项目不少于2项。',
        personnel: '传输网络专家不少于3名，均具备华为或中兴厂商认证工程师资格。',
        duration: '180日历天',
        location: '南京省公司本部+各地市中心机房',
        maxPrice: '0.00',
        estAmount: '0.00',
        quoteMethod: '总价报固定总价'
      }
    ]
  }
  ,
  {
    id: '3',
    projectId: 'HBDL-WZ-2026-01',
    title: '国网湖北省电力有限公司2026年第一批变电设备集中采购',
    category: '变电类',
    type: '物资',
    publishDate: '2026-01-08',
    deadline: '2026-02-28 16:00:00',
    openingTime: '2026-03-05 09:00:00',
    openingLocation: '武汉市洪山区湖北电力招标中心',
    purchaser: '国网湖北省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '3200万元',
    subPackages: [
      { id: '3-1', index: 1, subBidNumber: 'HBDL-2026-01', subBidName: '主变压器分标', lotNumber: '包1', lotName: '110kV主变压器采购', scope: '采购110kV三相双绕组有载调压变压器20台，用于湖北电网变电站新建及扩建工程。', qualifications: '具备电力设备制造许可证，产品通过国家电网入围测试。', experience: '近三年承接省级电力公司主变压器供货业绩不少于2项，单项供货量不低于10台。', personnel: '项目经理具备电气工程师资质，驻场服务工程师不少于3名。', duration: '150日历天', location: '湖北省各地市220kV变电站', maxPrice: '1800.00', estAmount: '1680.00', quoteMethod: '单价×数量' },
      { id: '3-2', index: 2, subBidNumber: 'HBDL-2026-02', subBidName: '开关柜分标', lotNumber: '包2', lotName: '10kV开关柜批量采购', scope: '采购10kV金属铠装移开式开关柜200面，用于配网扩容改造工程。', qualifications: '具备高压开关设备生产许可证，产品须获得3C认证。', experience: '近三年向省级电力公司供货开关柜累计不少于500面。', personnel: '技术支持工程师2名，现场安装指导人员4名。', duration: '90日历天', location: '湖北省武汉、黄石、宜昌等地', maxPrice: '980.00', estAmount: '920.00', quoteMethod: '单价×数量' },
      { id: '3-3', index: 3, subBidNumber: 'HBDL-2026-03', subBidName: '互感器分标', lotNumber: '包3', lotName: '电流互感器与电压互感器采购', scope: '采购35kV及110kV电流互感器、电压互感器各300台，供湖北电网计量改造项目使用。', qualifications: '具备计量器具制造许可证（CMC），产品通过计量院型式试验。', experience: '近三年具有省级电力公司互感器批量供货合同。', personnel: '计量专业技术人员不少于2名。', duration: '60日历天', location: '湖北省各县市供电所', maxPrice: '420.00', estAmount: '390.00', quoteMethod: '单价×数量' }
    ]
  },
  {
    id: '4',
    projectId: 'CSG-IT-2026-03',
    title: '南方电网2026年第三批IT基础设施及云平台服务采购',
    category: '信通类',
    type: '物资',
    publishDate: '2026-01-15',
    deadline: '2026-03-01 17:00:00',
    openingTime: '2026-03-10 10:00:00',
    openingLocation: '广州市越秀区南方电网总部大楼',
    purchaser: '中国南方电网有限责任公司',
    status: '正在采购',
    platform: '南网',
    budget: '5800万元',
    subPackages: [
      { id: '4-1', index: 1, subBidNumber: 'CSG-IT-2026-03-01', subBidName: '服务器分标', lotNumber: '包1', lotName: '高性能计算服务器采购', scope: '采购x86架构高密度计算服务器100台，用于南方电网大数据中心扩容。', qualifications: '具备工业和信息化部颁发的计算机信息系统集成资质，产品列入政府采购目录。', experience: '近三年向省级以上国有企业提供服务器供货及运维服务，合同金额不低于500万元。', personnel: '原厂认证服务工程师不少于5名，7×24小时响应。', duration: '45日历天', location: '广州南方电网数据中心', maxPrice: '3200.00', estAmount: '2980.00', quoteMethod: '总价固定总价' },
      { id: '4-2', index: 2, subBidNumber: 'CSG-IT-2026-03-02', subBidName: '云平台运维分标', lotNumber: '包2', lotName: '私有云平台运营维护服务', scope: '提供南方电网私有云平台日常运维、容量规划、安全加固及7×24小时值班保障服务。', qualifications: '具备云计算服务能力评估（可信云）认证，信息系统集成及服务一级资质。', experience: '近三年承接大型国有企业私有云平台运维项目，规模不低于500台虚拟机。', personnel: '云架构工程师不少于3名，运维工程师不少于8名，均持有VMware或OpenStack认证。', duration: '365日历天', location: '广州、深圳双中心', maxPrice: '1800.00', estAmount: '1680.00', quoteMethod: '年费总价承包' },
      { id: '4-3', index: 3, subBidNumber: 'CSG-IT-2026-03-03', subBidName: '网络安全分标', lotNumber: '包3', lotName: '数据中心网络安全防护系统升级', scope: '升级南方电网数据中心下一代防火墙、IPS入侵防御及堡垒机系统，提升整体安全防护等级。', qualifications: '具备信息安全服务资质（CISP/CCRC），产品须通过公安部安全产品认证。', experience: '近三年承接省级以上电力或金融行业网络安全防护项目。', personnel: '安全专家不少于2名，实施工程师不少于4名，持CISSP或CISP证书。', duration: '120日历天', location: '广州南方电网数据中心', maxPrice: '820.00', estAmount: '780.00', quoteMethod: '总价报固定总价' }
    ]
  },
  {
    id: '5',
    projectId: 'ZJDL-SG-2026-02',
    title: '国网浙江省电力有限公司2026年输变电工程施工总承包招标',
    category: '变电类',
    type: '施工',
    publishDate: '2026-01-18',
    deadline: '2026-03-10 16:00:00',
    openingTime: '2026-03-20 09:00:00',
    openingLocation: '杭州市上城区浙江电力大厦',
    purchaser: '国网浙江省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '12000万元',
    subPackages: [
      { id: '5-1', index: 1, subBidNumber: 'ZJ-SG-2026-01', subBidName: '220kV新建分标', lotNumber: '包1', lotName: '220kV宁波东变电站新建工程', scope: '负责220kV宁波东变电站土建、电气安装及调试一体化施工，含GIS设备安装。', qualifications: '具备电力工程施工总承包一级资质，安全生产许可证有效。', experience: '近五年完成220kV及以上变电站施工工程不少于2座。', personnel: '项目经理具备一级建造师（电力工程）执照，技术负责人具备高级工程师职称。', duration: '540日历天', location: '浙江省宁波市', maxPrice: '7500.00', estAmount: '7200.00', quoteMethod: '总价固定总价' },
      { id: '5-2', index: 2, subBidNumber: 'ZJ-SG-2026-02', subBidName: '输电线路分标', lotNumber: '包2', lotName: '110kV架空线路改造工程', scope: '完成浙中地区110kV架空输电线路约80公里的导线增容改造，含铁塔加固及防雷改造。', qualifications: '具备电力工程施工总承包二级及以上资质。', experience: '近三年完成110kV架空线路施工或改造项目累计不低于50公里。', personnel: '项目经理具备二级及以上建造师资质，高空作业人员持特种作业证。', duration: '360日历天', location: '浙江省金华、衢州地区', maxPrice: '4500.00', estAmount: '4300.00', quoteMethod: '总价固定总价' }
    ]
  },
  {
    id: '6',
    projectId: 'GDSG-DH-2026-01',
    title: '国网广东省电力有限公司2026年数字化转型咨询与实施服务',
    category: '信通类',
    type: '服务',
    publishDate: '2026-01-20',
    deadline: '2026-03-05 17:00:00',
    openingTime: '2026-03-15 14:00:00',
    openingLocation: '广州市天河区广东电网研究院',
    purchaser: '国网广东省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '2500万元',
    subPackages: [
      { id: '6-1', index: 1, subBidNumber: 'GD-DH-2026-01', subBidName: '战略规划分标', lotNumber: '包1', lotName: '数字化转型顶层设计咨询', scope: '为国网广东公司制定未来三年数字化转型路线图，包括业务架构重塑、数据治理框架及数字孪生应用规划。', qualifications: '具备信息系统集成及服务一级资质，咨询团队需有电力行业数字化转型成功案例。', experience: '近三年承接省级以上电力企业数字化咨询项目，合同金额不低于300万元。', personnel: '首席顾问具备10年以上电力行业数字化从业经验，团队总人数不低于8名。', duration: '270日历天', location: '广州市（驻场+远程结合）', maxPrice: '1500.00', estAmount: '1400.00', quoteMethod: '总价固定总价' },
      { id: '6-2', index: 2, subBidNumber: 'GD-DH-2026-02', subBidName: '系统实施分标', lotNumber: '包2', lotName: '数字孪生电网平台建设', scope: '基于国网GIS平台，建设覆盖广东电网主要输变电设备的数字孪生系统，支持实时状态映射与仿真分析。', qualifications: '具备软件开发甲级资质及CMMI3认证，具有GIS/BIM相关软件著作权。', experience: '近三年具有电力或市政行业数字孪生平台成功交付案例。', personnel: '系统架构师1名，GIS工程师不少于3名，前端工程师不少于5名。', duration: '365日历天', location: '广州省公司本部', maxPrice: '1000.00', estAmount: '950.00', quoteMethod: '总价固定总价' }
    ]
  },
  {
    id: '7',
    projectId: 'HNDL-PN-2026-04',
    title: '国网河南省电力有限公司2026年配网自动化设备批量采购',
    category: '配网类',
    type: '物资',
    publishDate: '2026-01-22',
    deadline: '2026-03-08 16:00:00',
    openingTime: '2026-03-18 09:00:00',
    openingLocation: '郑州市金水区河南电力采购中心',
    purchaser: '国网河南省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '4600万元',
    subPackages: [
      { id: '7-1', index: 1, subBidNumber: 'HN-PN-2026-01', subBidName: 'DTU分标', lotNumber: '包1', lotName: '馈线自动化终端（DTU）采购', scope: '采购户外型馈线自动化终端1500套，支持"三遥"功能，兼容国网标准规约。', qualifications: '产品须通过国家电网公司入围测试，具备工业产品生产许可证。', experience: '近三年向国网系统内省公司供货DTU累计不少于3000套。', personnel: '技术支持工程师不少于5名，可在3小时内响应现场故障。', duration: '90日历天', location: '河南省各地市供电公司仓库', maxPrice: '2600.00', estAmount: '2450.00', quoteMethod: '单价×数量' },
      { id: '7-2', index: 2, subBidNumber: 'HN-PN-2026-02', subBidName: '柱上开关分标', lotNumber: '包2', lotName: '10kV智能柱上断路器采购', scope: '采购10kV智能柱上真空断路器2000台，具备就地重合闸及远程遥控功能。', qualifications: '产品取得3C认证及国网入围资质，具备高压开关生产许可证。', experience: '近三年向国网系统供货柱上开关累计不低于5000台。', personnel: '工程技术人员不少于3名，具备专业安装调试能力。', duration: '120日历天', location: '河南省各县市配网改造工地', maxPrice: '1600.00', estAmount: '1520.00', quoteMethod: '单价×数量' },
      { id: '7-3', index: 3, subBidNumber: 'HN-PN-2026-03', subBidName: '低压监测分标', lotNumber: '包3', lotName: '低压智能配变终端（TTU）采购', scope: '采购低压智能配变终端5000套，支持台区识别、三相不平衡治理及线损分析功能。', qualifications: '产品通过国网企标检测，具备软件著作权及无线通信入网许可证。', experience: '近两年累计向国网省公司供货TTU不少于10000套。', personnel: '随货提供驻场调试人员不少于10名。', duration: '60日历天', location: '河南省全省台区', maxPrice: '400.00', estAmount: '380.00', quoteMethod: '单价×数量' }
    ]
  },
  {
    id: '8',
    projectId: 'SCDL-TX-2026-02',
    title: '国网四川省电力有限公司2026年通信光缆及传输系统维护服务采购',
    category: '信通类',
    type: '服务',
    publishDate: '2026-01-25',
    deadline: '2026-03-12 16:00:00',
    openingTime: '2026-03-22 10:00:00',
    openingLocation: '成都市锦江区四川电力大厦',
    purchaser: '国网四川省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '1800万元',
    subPackages: [
      { id: '8-1', index: 1, subBidNumber: 'SC-TX-2026-01', subBidName: '光缆运维分标', lotNumber: '包1', lotName: '骨干光缆网络运维服务', scope: '负责四川电力骨干OPGW光缆约4000公里的日常巡检、障碍抢修及熔接维护，含年度光衰测试。', qualifications: '具备通信工程施工总承包三级及以上资质，光缆熔接人员持证上岗。', experience: '近三年承接省级电力公司骨干光缆运维项目，规模不低于2000公里。', personnel: '驻场工程师分布于全省21个市州，总人数不少于42名。', duration: '365日历天', location: '四川全省', maxPrice: '1100.00', estAmount: '1050.00', quoteMethod: '年费总价承包' },
      { id: '8-2', index: 2, subBidNumber: 'SC-TX-2026-02', subBidName: '传输系统分标', lotNumber: '包2', lotName: 'SDH/OTN传输设备维护保障', scope: '提供四川电力SDH/OTN传输设备的7×24小时监控、故障处理、版本升级及备品备件管理服务。', qualifications: '具备华为、中兴或烽火等主流厂商授权服务资质，信息系统集成二级及以上资质。', experience: '近三年具有省级电力公司传输系统维保项目，设备规模不低于200套。', personnel: '传输专家不少于3名，均持有厂商认证工程师证书。', duration: '365日历天', location: '成都省公司中心机房+各地市机房', maxPrice: '700.00', estAmount: '660.00', quoteMethod: '年费总价承包' }
    ]
  },
  {
    id: '9',
    projectId: 'CSG-XNY-2026-02',
    title: '南方电网2026年新能源接入配套工程施工总承包（广西片区）',
    category: '变电类',
    type: '施工',
    publishDate: '2026-02-01',
    deadline: '2026-03-20 16:00:00',
    openingTime: '2026-04-01 09:00:00',
    openingLocation: '南宁市青秀区南方电网广西公司',
    purchaser: '南方电网广西壮族自治区电力有限公司',
    status: '正在采购',
    platform: '南网',
    budget: '8500万元',
    subPackages: [
      { id: '9-1', index: 1, subBidNumber: 'CSG-GX-2026-01', subBidName: '风电接入分标', lotNumber: '包1', lotName: '桂北地区风电汇集站新建工程', scope: '新建110kV风电汇集升压站2座，含主变及配套GIS安装，满足桂北300MW风电接入需求。', qualifications: '具备电力工程施工总承包一级资质，具有新能源接入工程施工经验。', experience: '近三年完成风电/光伏接入工程施工不少于3项，单项接入规模不低于100MW。', personnel: '项目经理持一级建造师证书，施工团队不少于80人。', duration: '480日历天', location: '广西桂林、柳州山区', maxPrice: '5200.00', estAmount: '5000.00', quoteMethod: '总价固定总价' },
      { id: '9-2', index: 2, subBidNumber: 'CSG-GX-2026-02', subBidName: '光伏接入分标', lotNumber: '包2', lotName: '桂南光伏配套送出线路工程', scope: '建设桂南地区光伏电站至220kV变电站的110kV送出线路约120公里，含铁塔组立及架线施工。', qualifications: '具备电力工程施工总承包二级及以上资质，线路施工专业资质齐全。', experience: '近三年完成110kV输电线路施工项目，累计里程不低于80公里。', personnel: '高空作业人员均持特种作业操作证，驻场安全员不少于4名。', duration: '365日历天', location: '广西南宁、钦州地区', maxPrice: '3300.00', estAmount: '3150.00', quoteMethod: '总价固定总价' }
    ]
  },
  {
    id: '10',
    projectId: 'SDDL-ZB-2026-03',
    title: '国网山东省电力有限公司2026年智能电表及用电信息采集设备批量采购',
    category: '信通类',
    type: '物资',
    publishDate: '2026-02-05',
    deadline: '2026-03-25 16:00:00',
    openingTime: '2026-04-05 09:00:00',
    openingLocation: '济南市历下区山东电力招标采购中心',
    purchaser: '国网山东省电力有限公司',
    status: '正在采购',
    platform: '国网',
    budget: '9200万元',
    subPackages: [
      { id: '10-1', index: 1, subBidNumber: 'SD-ZB-2026-01', subBidName: '单相电表分标', lotNumber: '包1', lotName: '单相智能电能表采购', scope: '采购单相费控智能电能表300万只，支持本地费控及远程费控双模式，符合国网最新企标。', qualifications: '产品获得国家电能表制造许可证（CMC）及国网入围资质，通过山东省计量院型式试验。', experience: '近三年向国网系统内省公司供货单相智能电表累计不少于500万只。', personnel: '售后服务工程师覆盖全省各地市，响应时间不超过48小时。', duration: '120日历天', location: '山东省各地市供电公司计量中心', maxPrice: '5400.00', estAmount: '5200.00', quoteMethod: '单价×数量' },
      { id: '10-2', index: 2, subBidNumber: 'SD-ZB-2026-02', subBidName: '三相电表分标', lotNumber: '包2', lotName: '三相智能电能表采购', scope: '采购三相四线电子式多功能电能表50万只，用于山东电网工商业客户计量改造。', qualifications: '产品通过CMC认证及国网入围测试，具备三相计量设备完整的型式试验报告。', experience: '近三年向国网系统供货三相智能电表合计不低于100万只。', personnel: '计量技术专家不少于2名，安装调试人员不少于50名。', duration: '90日历天', location: '山东省工商业客户现场', maxPrice: '2800.00', estAmount: '2650.00', quoteMethod: '单价×数量' },
      { id: '10-3', index: 3, subBidNumber: 'SD-ZB-2026-03', subBidName: '采集终端分标', lotNumber: '包3', lotName: '用电信息采集终端（集中器）采购', scope: '采购低压用电信息采集集中器10万台，支持RS-485及微功率无线双通信方式，兼容国网II型协议。', qualifications: '产品通过国网采集设备入围测试，具备无线电发射设备型号核准证。', experience: '近两年向国网系统省公司供货集中器累计不低于20万台。', personnel: '工程技术人员不少于5名，支持线上远程调试。', duration: '75日历天', location: '山东省各县市低压台区', maxPrice: '1000.00', estAmount: '950.00', quoteMethod: '单价×数量' }
    ]
  }
];

interface CrawlerViewProps {
  plannedIds: string[];
  onTogglePlan: (tender: any) => void;
  onAddLog: (log: Omit<SystemLog, 'id'>) => void;
}

type ColDef = {
  key: string;
  label: string;
  width: string;
  renderTd: (pkg: SubPackage, tender: Tender) => React.ReactNode;
};

const PLATFORM_STYLES: Record<string, string> = {
  '国网': 'bg-blue-50 text-blue-700 border-blue-200',
  '南网': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '其他来源': 'bg-slate-100 text-slate-500 border-slate-200',
};

const DRAGGABLE_COLS: ColDef[] = [
  { key: 'projectId',    label: '采购项目编号',       width: 'w-48', renderTd: (_, t) => <td key="projectId"    className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-600 italic">{t.projectId}</td> },
  { key: 'platform',     label: '来源',              width: 'w-28', renderTd: (_, t) => { const p = t.platform ?? '其他来源'; return <td key="platform" className="px-4 py-4 border-r border-b border-slate-100"><span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${PLATFORM_STYLES[p] ?? PLATFORM_STYLES['其他来源']}`}>{p}</span></td>; } },
  { key: 'title',        label: '项目名称',           width: 'w-80', renderTd: (_, t) => <td key="title"        className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-800">{t.title}</td> },
  { key: 'deadline',     label: '采购文件获取截止时间', width: 'w-48', renderTd: (_, t) => <td key="deadline"     className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-600">{t.deadline}</td> },
  { key: 'openingTime',  label: '开启应答文件时间',    width: 'w-48', renderTd: (_, t) => <td key="openingTime"  className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-blue-600">{t.openingTime}</td> },
  { key: 'subBidNumber', label: '分标编号',           width: 'w-48', renderTd: (p)    => <td key="subBidNumber" className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-600 italic">{p.subBidNumber}</td> },
  { key: 'subBidName',   label: '分标名称',           width: 'w-60', renderTd: (p)    => <td key="subBidName"   className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-800">{p.subBidName}</td> },
  { key: 'lotNumber',    label: '包号',              width: 'w-24', renderTd: (p)    => <td key="lotNumber"    className="px-4 py-4 border-r border-b border-slate-100 text-xs font-black text-blue-600">{p.lotNumber}</td> },
  { key: 'lotName',      label: '包名称',             width: 'w-64', renderTd: (p)    => <td key="lotName"      className="px-4 py-4 border-r border-b border-slate-100 text-xs font-black text-slate-900">{p.lotName}</td> },
  { key: 'scope',        label: '招标范围',           width: 'w-96', renderTd: (p)    => <td key="scope"        className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-w-none">{p.scope}</td> },
  { key: 'qualifications',label: '资质要求',          width: 'w-80', renderTd: (p)    => <td key="qualifications" className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{p.qualifications}</td> },
  { key: 'experience',   label: '业绩要求',           width: 'w-80', renderTd: (p)    => <td key="experience"   className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{p.experience}</td> },
  { key: 'personnel',    label: '人员要求',           width: 'w-80', renderTd: (p)    => <td key="personnel"    className="px-4 py-4 border-r border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">{p.personnel}</td> },
  { key: 'duration',     label: '工期',              width: 'w-32', renderTd: (p)    => <td key="duration"     className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-700">{p.duration}</td> },
  { key: 'location',     label: '实施地点',           width: 'w-48', renderTd: (p)    => <td key="location"     className="px-4 py-4 border-r border-b border-slate-100 text-xs font-bold text-slate-700">{p.location}</td> },
  { key: 'maxPrice',     label: '最高限价(万)',        width: 'w-32', renderTd: (p)    => <td key="maxPrice"     className="px-4 py-4 border-r border-b border-slate-100 text-sm font-black text-slate-900">{p.maxPrice}</td> },
  { key: 'estAmount',    label: '预计金额(万)',        width: 'w-32', renderTd: (p)    => <td key="estAmount"    className="px-4 py-4 border-r border-b border-slate-100 text-sm font-black text-blue-600">{p.estAmount}</td> },
  { key: 'quoteMethod',  label: '报价方式',           width: 'w-40', renderTd: (p)    => <td key="quoteMethod"  className="px-4 py-4 border-b border-slate-100 text-xs font-bold text-slate-500 italic">{p.quoteMethod}</td> },
];

const CrawlerView: React.FC<CrawlerViewProps> = ({ plannedIds, onTogglePlan, onAddLog }) => {
  const [isCrawling, setIsCrawling] = useState(false);
  const PAGE_SIZE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [subPackageSearch, setSubPackageSearch] = useState('');
  const [subPkgPage, setSubPkgPage] = useState(1);
  const SUB_PKG_PAGE_SIZE = 20;
  const [colOrder, setColOrder] = useState<string[]>([
    'projectId', 'platform', 'title', 'deadline', 'openingTime',
    'subBidNumber', 'subBidName', 'lotNumber', 'lotName',
    'maxPrice', 'estAmount',
    'scope', 'qualifications', 'experience', 'personnel',
    'duration', 'location', 'quoteMethod',
  ]);
  const dragKey = useRef<string | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const startCrawl = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setIsCrawling(false);
      onAddLog({
        timestamp: new Date().toLocaleString(),
        level: 'info',
        category: 'crawler',
        operator: 'System',
        action: '同步成功',
        details: '同步最新招标信息成功',
        ip: '10.0.8.24'
      });
    }, 1500);
  };

  const handleToggleLot = (tender: Tender, pkg: SubPackage) => {
    const lotId = `${tender.id}_lot_${pkg.id}`;
    const taskPayload = {
      ...tender,
      id: lotId,
      lotName: pkg.lotName
    };
    onTogglePlan(taskPayload);
  };

  const handleDragStart = (key: string) => {
    dragKey.current = key;
  };

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    if (dragKey.current !== key) setDragOverKey(key);
  };

  const handleDrop = (key: string) => {
    if (!dragKey.current || dragKey.current === key) {
      dragKey.current = null;
      setDragOverKey(null);
      return;
    }
    setColOrder(prev => {
      const next = [...prev];
      const from = next.indexOf(dragKey.current!);
      const to = next.indexOf(key);
      next.splice(from, 1);
      next.splice(to, 0, dragKey.current!);
      return next;
    });
    dragKey.current = null;
    setDragOverKey(null);
  };

  const handleDragEnd = () => {
    dragKey.current = null;
    setDragOverKey(null);
  };

  const orderedCols = colOrder.map(k => DRAGGABLE_COLS.find(c => c.key === k)!).filter(Boolean);

  // 切换项目或搜索词时重置分包页码
  React.useEffect(() => { setSubPkgPage(1); }, [selectedTender?.id, subPackageSearch]);

  // 分包分页计算
  const filteredSubPkgs = selectedTender
    ? (selectedTender.subPackages || []).filter(pkg => {
        const s = subPackageSearch.toLowerCase();
        return pkg.lotName.toLowerCase().includes(s) ||
               pkg.subBidName.toLowerCase().includes(s) ||
               pkg.scope.toLowerCase().includes(s);
      })
    : [];
  const subPkgTotalPages = Math.ceil(filteredSubPkgs.length / SUB_PKG_PAGE_SIZE);
  const pagedSubPkgs = filteredSubPkgs.slice((subPkgPage - 1) * SUB_PKG_PAGE_SIZE, subPkgPage * SUB_PKG_PAGE_SIZE);

  const totalPages = Math.ceil(mockTenders.length / PAGE_SIZE);
  const pagedTenders = mockTenders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col h-full p-6 space-y-4 relative">
      {/* 分包详情侧边栏 - 重新设计 */}
      {selectedTender && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTender(null)} />
          <div className="relative w-full max-w-[95vw] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md sticky top-0 z-10 text-left">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                  <Layers size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg uppercase tracking-widest">{selectedTender.projectId}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{selectedTender.type}项目</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                    {selectedTender.title}
                    <span className="ml-3 text-xs font-bold text-slate-400">共 {selectedTender.subPackages?.length || 0} 个标包</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={14} />
                  <input
                    type="text"
                    placeholder="搜索标包内容..."
                    value={subPackageSearch}
                    onChange={(e) => setSubPackageSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-56"
                  />
                </div>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl border border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center">
                  <ArrowUpRight size={14} className="mr-1.5 opacity-60" /> 导出解析结果
                </button>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center shadow-lg">
                  <Download size={14} className="mr-1.5" /> 下载文件包
                </button>
                <button onClick={() => setSelectedTender(null)} className="p-2.5 hover:bg-slate-200 rounded-full transition-colors ml-1">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-0 custom-scrollbar-main bg-slate-50">
              {selectedTender.subPackages && selectedTender.subPackages.length > 0 ? (
                <div className="min-w-max">
                  <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="sticky top-0 z-30 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="sticky left-0 z-40 bg-slate-100 w-16 px-4 py-4 border-b border-r border-slate-200 text-center select-none">序号</th>
                        <th className="sticky left-16 z-40 bg-slate-100 w-40 px-4 py-4 border-b border-r border-slate-200 select-none">操作</th>
                        {orderedCols.map((col) => {
                          const isDraggingThis = dragKey.current === col.key;
                          const isDragOver = dragOverKey === col.key;
                          return (
                            <th
                              key={col.key}
                              draggable
                              onDragStart={() => handleDragStart(col.key)}
                              onDragOver={(e) => handleDragOver(e, col.key)}
                              onDrop={() => handleDrop(col.key)}
                              onDragEnd={handleDragEnd}
                              className={`${col.width} px-4 py-4 border-b border-r border-slate-200 cursor-grab active:cursor-grabbing select-none transition-all
                                ${isDraggingThis ? 'opacity-40 bg-slate-200' : 'hover:bg-blue-50 hover:text-blue-700'}
                                ${isDragOver ? 'border-l-2 border-l-blue-500 bg-blue-50/80 text-blue-700' : ''}
                              `}
                            >
                              <span className="flex items-center gap-1.5">
                                <svg className="opacity-30 flex-shrink-0" width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
                                  <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/>
                                  <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/>
                                  <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/>
                                </svg>
                                {col.label}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {pagedSubPkgs.map((pkg) => {
                        const isPlanned = plannedIds.includes(`${selectedTender.id}_lot_${pkg.id}`);
                        return (
                          <tr key={pkg.id} className={`group transition-colors ${isPlanned ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                            <td className="sticky left-0 z-20 bg-inherit px-4 py-4 border-r border-b border-slate-100 text-center font-mono text-xs font-bold text-slate-400">{pkg.index}</td>
                            <td className="sticky left-16 z-20 bg-inherit px-4 py-4 border-r border-b border-slate-100">
                              <button
                                onClick={() => handleToggleLot(selectedTender, pkg)}
                                className={`w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${
                                  isPlanned ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600'
                                }`}
                              >
                                {isPlanned ? <CircleCheck size={12} className="mr-1.5" /> : <Plus size={12} className="mr-1.5" />}
                                {isPlanned ? '已加入' : '投标此包'}
                              </button>
                            </td>
                            {orderedCols.map(col => col.renderTd(pkg, selectedTender))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-20 italic">
                  <WifiOff size={64} strokeWidth={1} />
                  <p className="text-sm font-black uppercase tracking-[0.4em] mt-6">No Sub-packages Analyzed</p>
                </div>
              )}
            </div>

            {subPkgTotalPages > 1 && (
              <div className="px-8 py-3 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  共 {filteredSubPkgs.length} 个标包 · 第 {subPkgPage} / {subPkgTotalPages} 页（每页 {SUB_PKG_PAGE_SIZE} 条）
                </span>
                <div className="flex items-center space-x-1">
                  <button onClick={() => setSubPkgPage(1)} disabled={subPkgPage === 1} className="px-3 py-1.5 rounded-lg text-[10px] font-black border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all">«</button>
                  <button onClick={() => setSubPkgPage(p => Math.max(1, p - 1))} disabled={subPkgPage === 1} className="px-3 py-1.5 rounded-lg text-[10px] font-black border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all">‹</button>
                  {Array.from({ length: subPkgTotalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setSubPkgPage(page)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${page === subPkgPage ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900'}`}>{page}</button>
                  ))}
                  <button onClick={() => setSubPkgPage(p => Math.min(subPkgTotalPages, p + 1))} disabled={subPkgPage === subPkgTotalPages} className="px-3 py-1.5 rounded-lg text-[10px] font-black border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all">›</button>
                  <button onClick={() => setSubPkgPage(subPkgTotalPages)} disabled={subPkgPage === subPkgTotalPages} className="px-3 py-1.5 rounded-lg text-[10px] font-black border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all">»</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-left">
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100">
             <SearchIcon size={24} />
           </div>
           <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">招标抓取与深度解析</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">Automated synchronization with grid portal & lot granularity analysis</p>
          </div>
        </div>
        <button 
          onClick={startCrawl}
          disabled={isCrawling}
          className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl flex items-center transition-all disabled:opacity-50 shadow-2xl shadow-slate-200 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black active:scale-95"
        >
          <RefreshCcw size={18} className={`mr-3 ${isCrawling ? 'animate-spin' : ''}`} />
          {isCrawling ? '同步中' : '全网同步'}
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm flex flex-col flex-1 min-h-0">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex-1 max-w-md relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input type="text" placeholder="快速定位采购项目..." className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-slate-100 bg-white focus:outline-none focus:border-blue-600 transition-all font-bold text-sm" />
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                API Engine Online
             </div>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">状态 / 编号</th>
                <th className="px-6 py-4">来源</th>
                <th className="px-6 py-4">采购项目名称</th>
                <th className="px-6 py-4">采购文件获取截止时间</th>
                <th className="px-6 py-4">开启应答文件时间</th>
                <th className="px-6 py-4 text-right">操作控制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-left">
              {pagedTenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase bg-blue-100 text-blue-700 w-fit mb-2 italic tracking-widest">{tender.status}</span>
                       <p className="text-xs font-mono font-black text-slate-300 uppercase tracking-tighter">{tender.projectId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const p = tender.platform ?? '其他来源';
                      const styles: Record<string, string> = {
                        '国网': 'bg-blue-50 text-blue-700 border-blue-200',
                        '南网': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        '其他来源': 'bg-slate-100 text-slate-500 border-slate-200',
                      };
                      return (
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${styles[p]}`}>
                          {p}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 max-w-lg">
                    <div className="space-y-1.5">
                      <p className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors italic truncate">{tender.title}</p>
                      <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">
                         <span className="flex items-center"><Building2 size={12} className="mr-1.5" /> {tender.purchaser}</span>
                         <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                         <span className="flex items-center"><Layers size={12} className="mr-1.5" /> {tender.subPackages?.length || 0} 个分包已析出</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600">{tender.deadline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-blue-600">{tender.openingTime}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTender(tender)} 
                      className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                    >
                      查看分包清单 <ChevronRight size={14} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 shrink-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              共 {mockTenders.length} 条 · 第 {currentPage} / {totalPages} 页
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >«</button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    page === currentPage
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                  }`}
                >{page}</button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >›</button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >»</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrawlerView;
