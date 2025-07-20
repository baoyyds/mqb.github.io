// 初始化 Cesium Viewer
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhN2UyZDY2Ni00YzhmLTRjY2ItYTlmYi0xMWQ5Yzg5YmM0NGEiLCJpZCI6Mjk2NzE1LCJpYXQiOjE3NTA5OTA2MDV9.0efXg9h2uVQGfNU46qS87jB-PU7rd5FBeiIZdzxdb4k';
var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    timeline: false,
    geocoder: true,
    // 清除默认底图
    imageryProvider: false
});

// 初始加载卫星图
viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
}));

// 存储初始视图范围，用于复位功能
var initialView = null;

// 学校信息数组
var schools = [
    { name: "豹山幼儿园", position: [108.455514,25.243634], info: "<p>幼儿园在现在已经倒闭了，所以没有太多信息</p>" },
    { name: "明伦镇中心小学", position: [108.411385,25.215796], info: "<p>明伦小学是我们镇上小学，资源与环境都比较一般，从一年级到三年级我的成绩都比较好，四、五年级后急速下坠，在六年级时便转入了县里了的小学</p><img src='piture/明伦小学.jpg' style='width:100%;'>" },
    { name: "环江县第二小学", position: [108.257069, 24.829300], info: "<h3>环江县第二小学</h3><p>环江二小以“诚信敏学”为校训，以“做最好的自己办诚信的教育”为办学理念，“让孩子们在和谐中快乐成长”为办学目标，以“培养勤勉好学、诚信大气的中国人”为培养目标，以“阅读奠底蕴，艺术见特长”为办学特色，打造翰墨飘香的校园文化。</p><img src='piture/环江二小.jpg' style='width:100%;'><img src='piture/环江二小2.jpg' style='width:100%;'>" },
    { name: "环江县第一中学", position: [108.256715, 24.837718], info: "<h3>环江县第一中学</h3><p>环江一中坐落在风景秀丽的环江河南岸,始建于1930年3月，占地158亩，有40个教学班，教职工 80 人，学生 1460 人，生均占地面积28.73 平方米 ，生均建筑面积 13.11 平方米 。校园里建有九曲桥、 “爱心园”、 “憩园”、文化长廊、中心广场，与现代化的教学大楼相映成趣，浑然一体。校园里绿树成荫，鲜花似海，草坪如带，总绿化面积 10826 平方米 。</p><img src='piture/环江一中.jpg' style='width:100%;'><img src='piture/环江一中2.jpg' style='width:100%;'>" },
    { name: "环江县高级中学", position: [108.257903, 24.831287], info: "<h3>环江毛南族自治县高级中学</h3><p>环江毛南族自治县高级中学（简称：环江高中）创建于1937年11月，是一所规模较大、设施齐全、师资力量雄厚的高级中学。2000年，学校晋升河池地区重点中学，2001年，被确立为广西壮族自治区示范性普通高中。环江高中位于环江县主城区，距河池市中心城区约18公里，乘坐高铁至广西首府南宁市仅1小时左右路程，交通便利。学校占地约200亩（望峰老校区+凤凰新校区），新老校区相连，拥有良好的办学基础设施和优雅的教育教学环境。近年来，学校教学质量不断提升，2005至2022年有30多位同学考取清华大学和北京大学；更有一大批同学考取复旦大学、浙江大学、上海交大、武汉大学、南京大学、西安交大、中山大学、中国人民大学、中国科学技术大学、国防科技大学……等“双一流”重点大学； [13]清华大学生源中学、 [1]广西大学“优质生源基地”、 [14]华南理工大学“优质生源基地”……环江高中是全国文明校园 [2]、自治区文明单位，自治区“和谐学校”。连年荣获“全区中小学德育工作先进集体”、“河池市普通高中教育教学质量优秀学校甲级一等奖”、 “河池市普通高中教学质量优秀学校特别贡献奖”等荣誉称号。 2017年11月，环江毛南族自治县高级中学获评第一届全国文明校园。</p><img src='piture/环江高中.jpg' style='width:100%;'><img src='piture/环江高中2.jpg' style='width:100%;'><img src='piture/环江高中3.jpg' style='width:100%;'>" },
    { name: "南宁师范大学", position: [108.284804, 23.180026], info: "<h3>南宁师范大学</h3><p>南宁师范大学坐落于北部湾经济区核心城市、中国—东盟博览会永久举办地的广西壮族自治区首府南宁市，是自治区人民政府举办的本科师范院校。历史悠久积淀深厚。溯源于1953年10月在桂林创办的广西中等学校教师进修学院，数迁其址、屡易其名，不断发展壮大。1978年，成立广西师范学院，举办全日制普通本科教育；次年，更名为南宁师范学院；1985年，更名为广西师范学院；1998年，举办全日制硕士研究生教育；2003年，创建于1905年的广西南宁民族师范学校并入；2015年，学校五合校区启用；2018年，学校通过教育部批准，更名为南宁师范大学；2019年，学校武鸣校区启用；2022年，广西教育学院并入，奏响新的时代乐章。蓬勃发展日新月异。有五合、武鸣、明秀、长岗、建政五个校区，占地面积近3400亩。现有全日制普通本科生23000多人，硕士研究生3500多人，专科生1400多人。学校有22个学院，2个研究院，1家杂志社。馆藏图书246.32万册，电子图书313.62万册，电子期刊4.21万种。学校师资雄厚，现有专任教师1500余人，其中具有硕士学位以上教师1300余人，高级专业技术职务教师680余人、博士生导师44人、硕士生导师565人，国家级、省部级人才称号获得者110余人次。</p><img src='piture/南宁师范大学.jpg' style='width:100%;'><img src='piture/南宁师范大学武2教学楼.jpg' style='width:100%;'><img src='piture/南师大南门.jpg' style='width:100%;'><img src='piture/南师大田径场.jpg' style='width:100%;'>" }
];

// 添加学校点到地图上
var entities = [];
schools.forEach(function (school) {
    var entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(school.position[0], school.position[1]),
        point: {
            pixelSize: 10,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
        },
        name: school.name,
        info: school.info
    });
    entities.push(entity);
});

// 点击点弹出弹窗
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
    var pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && pickedObject.id instanceof Cesium.Entity) {
        var entity = pickedObject.id;
        var popup = document.getElementById('customPopup');
        var title = document.getElementById('popupTitle');
        var content = document.getElementById('popupContent');
        var cesiumContainer = document.getElementById('cesiumContainer');
        
        // 获取地图容器和弹窗的尺寸信息
        var containerRect = cesiumContainer.getBoundingClientRect();
        var popupWidth = popup.offsetWidth || 320;  
        var popupHeight = popup.offsetHeight || 300; 
        
        // 设置弹窗内容
        title.textContent = entity.name;
        content.innerHTML = entity.info;
        popup.style.display = 'block';
        
        // 计算弹窗基础位置
        let left = movement.position.x + 10;
        let top = movement.position.y - 10;
        
        // 限制弹窗不超出地图右侧
        if (left + popupWidth > containerRect.width) {
            left = containerRect.width - popupWidth - 10; 
        }
        
        // 限制弹窗不超出地图顶部
        if (top < 0) {
            top = 10;
        }
        
        // 限制弹窗不超出地图底部
        if (top + popupHeight > containerRect.height) {
            top = containerRect.height - popupHeight - 10; 
        }
        
        // 应用最终计算的位置
        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// 关闭弹窗
var closeButton = document.getElementById('closePopup');
closeButton.addEventListener('click', function () {
    var popup = document.getElementById('customPopup');
    popup.style.display = 'none';
});

// 连接学校点
var positions = [];
schools.forEach(function (school) {
    positions.push(Cesium.Cartesian3.fromDegrees(school.position[0], school.position[1]));
});

viewer.entities.add({
    polyline: {
        positions: positions,
        width: 2,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.RED,
            dashLength: 10
        })
    }
});

// 计算学校点的边界范围
var minLon = Infinity;
var maxLon = -Infinity;
var minLat = Infinity;
var maxLat = -Infinity;

schools.forEach(function(school) {
    var lon = school.position[0];
    var lat = school.position[1];
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
});

// 扩展边界范围（增加边距）
var lonPadding = 0.1;
var latPadding = 0.1;
minLon -= lonPadding;
maxLon += lonPadding;
minLat -= latPadding;
maxLat += latPadding;

// 创建扩展后的边界范围
var rectangle = Cesium.Rectangle.fromDegrees(minLon, minLat, maxLon, maxLat);

// 初始视图设置
function setInitialView() {
    viewer.camera.flyTo({
        destination: rectangle,
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        },
        duration: 2,
        complete: function() {
            // 保存初始视图状态，用于复位功能
            initialView = {
                destination: viewer.camera.position.clone(),
                orientation: {
                    heading: viewer.camera.heading,
                    pitch: viewer.camera.pitch,
                    roll: viewer.camera.roll
                }
            };
        }
    });
}

// 初始化视图
setInitialView();

// 复位按钮功能 - 回到初始窗口
document.getElementById('reset').addEventListener('click', function() {
    showStatusMessage('正在复位到初始视图...');
    
    if (initialView) {
        viewer.camera.flyTo({
            destination: initialView.destination,
            orientation: initialView.orientation,
            duration: 1.5,
            complete: function() {
                showStatusMessage('已复位到初始视图', 2000);
            }
        });
    } else {
        // 如果初始视图未保存，重新计算
        setInitialView();
        showStatusMessage('已复位到初始视图', 2000);
    }
});

// 定位按钮功能 - 定位到用户当前位置
document.getElementById('locate').addEventListener('click', function() {
    showStatusMessage('正在获取您的位置...');
    
    if (!navigator.geolocation) {
        showStatusMessage('您的浏览器不支持地理定位', 3000);
        return;
    }
    
    // 使用浏览器的地理定位API
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // 定位成功
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            var height = 1000; // 高度设为1000米
            
            showStatusMessage('正在定位到您的位置...');
            
            // 飞到用户位置
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-45.0),
                    roll: 0.0
                },
                duration: 2,
                complete: function() {
                    // 添加一个临时标记显示用户位置
                    var userPositionEntity = viewer.entities.add({
                        name: '您的位置',
                        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
                        point: {
                            pixelSize: 12,
                            color: Cesium.Color.BLUE,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 2
                        }
                    });
                    
                    showStatusMessage('已定位到您的位置', 3000);
                    
                    // 5秒后移除用户位置标记
                    setTimeout(function() {
                        viewer.entities.remove(userPositionEntity);
                    }, 5000);
                }
            });
        },
        function(error) {
            // 定位失败
            var errorMessage;
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "请允许获取位置信息权限";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "无法获取您的位置";
                    break;
                case error.TIMEOUT:
                    errorMessage = "定位超时";
                    break;
                default:
                    errorMessage = "定位发生错误";
            }
            showStatusMessage(errorMessage, 3000);
        }
    );
});

// 为学校导航按钮添加点击事件
const schoolButtons = document.querySelectorAll('[id^="btnSchool"]');
schoolButtons.forEach(button => {
    button.addEventListener('click', () => {
        const schoolName = button.textContent;
        const targetSchool = schools.find(school => school.name === schoolName);
        if (targetSchool) {
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(targetSchool.position[0], targetSchool.position[1], 500),
                orientation: {
                    heading: Cesium.Math.toRadians(0.0),
                    pitch: Cesium.Math.toRadians(-90.0), // 视角垂直向下正对点
                    roll: 0.0
                }
            });
        }
    });
});


// 底图切换函数
function changeBaseMap(mapType) {
    viewer.imageryLayers.removeAll();
    let layerName;
    
    switch (mapType) {
        case 'streetMap':
            viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            }));
            layerName = '街道图';
            break;
        case 'satelliteMap':
            viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            }));
            layerName = '卫星图';
            break;
        case 'terrainMap':
            viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'
            }));
            layerName = '地形图';
            break;
    }
    
    showStatusMessage(`已切换为${layerName}`, 1500);
}

// 底图切换按钮点击事件
const mapButtons = document.querySelectorAll('#toolbar button[id$="Map"]');
mapButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mapType = button.id;
        changeBaseMap(mapType);
    });
});

// 鼠标移动显示经纬度
var coordinateText = document.getElementById('coordinateText');
var handlerMove = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handlerMove.setInputAction(function (movement) {
    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
    if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        coordinateText.textContent = `经度: ${longitude}, 纬度: ${latitude}`;
    } else {
        coordinateText.textContent = '暂无数据';
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 显示状态消息
function showStatusMessage(message, duration = 3000) {
    const statusElement = document.getElementById('locationStatus');
    statusElement.textContent = message;
    statusElement.style.display = 'block';
    
    // 自动隐藏
    clearTimeout(showStatusMessage.timeoutId);
    showStatusMessage.timeoutId = setTimeout(() => {
        statusElement.style.display = 'none';
    }, duration);
}


// 数据存储与管理
const DataManager = {
  // 用户相关
  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },
  
  saveUser(user) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.username === user.username || u.email === user.email);
    
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    return user;
  },
  
  getUserByCredentials(identifier, password) {
    const users = this.getUsers();
    return users.find(user => 
      (user.username === identifier || user.email === identifier) && 
      user.password === password
    );
  },
  
  getUserByUsername(username) {
    const users = this.getUsers();
    return users.find(user => user.username === username);
  },
  
  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  },
  
  // 学校相关
  getSchools(username) {
    const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    return allSchools.filter(school => school.username === username);
  },
  
  saveSchool(school) {
    const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    const existingIndex = allSchools.findIndex(s => s.id === school.id);
    
    if (!school.id) {
      school.id = Date.now().toString(); // 生成唯一ID
    }
    
    if (existingIndex >= 0) {
      allSchools[existingIndex] = school;
    } else {
      allSchools.push(school);
    }
    
    localStorage.setItem('schools', JSON.stringify(allSchools));
    return school;
  },
  
  deleteSchool(schoolId) {
    let allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    allSchools = allSchools.filter(school => school.id !== schoolId);
    localStorage.setItem('schools', JSON.stringify(allSchools));
  }
};

// 用户认证管理
const AuthManager = {
  currentUser: null,
  
  init() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateUserInterface();
    }
  },
  
  login(identifier, password) {
    const user = DataManager.getUserByCredentials(identifier, password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.updateUserInterface();
      return true;
    }
    return false;
  },
  
  register(username, email, password) {
    // 检查用户名是否已存在
    if (DataManager.getUserByUsername(username)) {
      return { success: false, message: '用户名已存在' };
    }
    
    // 检查邮箱是否已存在
    if (DataManager.getUserByEmail(email)) {
      return { success: false, message: '邮箱已被注册' };
    }
    
    // 创建新用户
    const newUser = {
      username,
      email,
      password,
      name: username, // 默认名称为用户名
      avatar: ''
    };
    
    DataManager.saveUser(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.updateUserInterface();
    
    return { success: true };
  },
  
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.updateUserInterface();
  },
  
  updateUserInterface() {
    const userBtn = document.getElementById('userBtn');
    const userInfoSection = document.getElementById('userInfoSection');
    
    if (this.currentUser) {
      userBtn.textContent = `欢迎, ${this.currentUser.name || this.currentUser.username}`;
      userInfoSection.style.display = 'block';
    } else {
      userBtn.textContent = '登录/注册';
      userInfoSection.style.display = 'none';
    }
    
    // 刷新学校列表
    SchoolManager.loadSchools();
  }
};

// 学校管理
const SchoolManager = {
  currentSchoolId: null,
  
  loadSchools() {
    const schoolsList = document.getElementById('schoolsList');
    schoolsList.innerHTML = '';
    
    if (!AuthManager.currentUser) {
      schoolsList.innerHTML = '<p>请先登录以管理学校信息</p>';
      return;
    }
    
    const schools = DataManager.getSchools(AuthManager.currentUser.username);
    
    if (schools.length === 0) {
      schoolsList.innerHTML = '<p>暂无学校信息，请添加</p>';
      return;
    }
    
    schools.forEach(school => {
      const schoolItem = document.createElement('div');
      schoolItem.className = 'school-item';
      
      schoolItem.innerHTML = `
        <div>
          <strong>${school.name}</strong>
          <p>${school.address || '无地址信息'}</p>
          <p>${school.startDate ? `${school.startDate} - ${school.endDate || '至今'}` : ''}</p>
        </div>
        <div class="school-actions">
          <button onclick="SchoolManager.editSchool('${school.id}')">编辑</button>
          <button onclick="SchoolManager.deleteSchool('${school.id}')">删除</button>
        </div>
      `;
      
      schoolsList.appendChild(schoolItem);
    });
  },
  
  editSchool(schoolId) {
    this.currentSchoolId = schoolId;
    const schoolFormContainer = document.getElementById('schoolFormContainer');
    const schoolsList = document.getElementById('schoolsList');
    
    // 显示表单，隐藏列表
    schoolFormContainer.style.display = 'block';
    schoolsList.style.display = 'none';
    
    if (schoolId) {
      // 加载现有学校数据
      const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
      const school = allSchools.find(s => s.id === schoolId);
      
      if (school) {
        document.getElementById('schoolId').value = school.id;
        document.getElementById('schoolName').value = school.name || '';
        document.getElementById('schoolAddress').value = school.address || '';
        document.getElementById('startDate').value = school.startDate || '';
        document.getElementById('endDate').value = school.endDate || '';
        document.getElementById('schoolType').value = school.type || '';
        document.getElementById('schoolInfo').value = school.info || '';
        document.getElementById('schoolMemories').value = school.memories || '';
        document.getElementById('schoolVideoUrl').value = school.videoUrl || '';
        document.getElementById('schoolSongUrl').value = school.songUrl || '';
        
        // 加载校徽预览
        this.loadEmblemPreview(school.emblem);
        
        // 加载照片预览
        this.loadPhotosPreview(school.photos || []);
        
        // 加载视频预览
        this.loadVideoPreview(school.videoUrl, school.video);
        
        // 加载音频预览
        this.loadAudioPreview(school.songUrl, school.song);
      }
    } else {
      // 重置表单
      document.getElementById('schoolForm').reset();
      document.getElementById('schoolId').value = '';
      document.getElementById('emblemPreviewContainer').innerHTML = '';
      document.getElementById('photosPreviewContainer').innerHTML = '';
      document.getElementById('videoPreviewContainer').innerHTML = '';
      document.getElementById('audioPreviewContainer').innerHTML = '';
    }
  },
  
  deleteSchool(schoolId) {
    if (confirm('确定要删除这所学校的信息吗？')) {
      DataManager.deleteSchool(schoolId);
      this.loadSchools();
    }
  },
  
  saveSchool(formData) {
    if (!AuthManager.currentUser) {
      return { success: false, message: '请先登录' };
    }
    
    const school = {
      id: formData.id || null,
      username: AuthManager.currentUser.username,
      name: formData.name,
      address: formData.address,
      startDate: formData.startDate,
      endDate: formData.endDate,
      type: formData.type,
      info: formData.info,
      memories: formData.memories,
      videoUrl: formData.videoUrl,
      songUrl: formData.songUrl
    };
    
    // 保留已有的媒体数据
    if (formData.id) {
      const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
      const existingSchool = allSchools.find(s => s.id === formData.id);
      
      if (existingSchool) {
        school.emblem = existingSchool.emblem || null;
        school.photos = existingSchool.photos || [];
        school.video = existingSchool.video || null;
        school.song = existingSchool.song || null;
      }
    }
    
    DataManager.saveSchool(school);
    return { success: true };
  },
  
  // 媒体处理方法
  loadEmblemPreview(emblemData) {
    const container = document.getElementById('emblemPreviewContainer');
    container.innerHTML = '';
    
    if (emblemData) {
      const img = document.createElement('img');
      img.src = emblemData;
      img.style.maxWidth = '100px';
      img.style.marginTop = '10px';
      container.appendChild(img);
    }
  },
  
  loadPhotosPreview(photos) {
    const container = document.getElementById('photosPreviewContainer');
    container.innerHTML = '';
    
    photos.forEach((photo, index) => {
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      
      photoItem.innerHTML = `
        <img src="${photo}" alt="学校照片">
        <button class="remove-photo" onclick="SchoolManager.removePhoto(${index})">×</button>
      `;
      
      container.appendChild(photoItem);
    });
  },
  
  loadVideoPreview(videoUrl, videoData) {
    const container = document.getElementById('videoPreviewContainer');
    container.innerHTML = '';
    
    if (videoUrl) {
      container.innerHTML = `<video src="${videoUrl}" controls style="max-width: 100%; margin-top: 10px;" poster="https://via.placeholder.com/150?text=Video+Preview"></video>`;
    } else if (videoData) {
      container.innerHTML = `<video src="${videoData}" controls style="max-width: 100%; margin-top: 10px;"></video>`;
    }
  },
  
  loadAudioPreview(audioUrl, audioData) {
    const container = document.getElementById('audioPreviewContainer');
    container.innerHTML = '';
    
    if (audioUrl) {
      container.innerHTML = `<audio src="${audioUrl}" controls style="width: 100%; margin-top: 10px;"></audio>`;
    } else if (audioData) {
      container.innerHTML = `<audio src="${audioData}" controls style="width: 100%; margin-top: 10px;"></audio>`;
    }
  },
  
  removePhoto(index) {
    if (!this.currentSchoolId) return;
    
    const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    const schoolIndex = allSchools.findIndex(s => s.id === this.currentSchoolId);
    
    if (schoolIndex >= 0) {
      allSchools[schoolIndex].photos = allSchools[schoolIndex].photos || [];
      allSchools[schoolIndex].photos.splice(index, 1);
      localStorage.setItem('schools', JSON.stringify(allSchools));
      this.loadPhotosPreview(allSchools[schoolIndex].photos);
    }
  }
};

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化认证管理器
  AuthManager.init();
  
  // 用户菜单交互
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');
  
  userBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
  });
  
  // 点击其他地方关闭下拉菜单
  document.addEventListener('click', function() {
    userDropdown.style.display = 'none';
  });
  
  // 登录模态框
  const loginModal = document.getElementById('loginModal');
  const loginBtn = document.getElementById('loginBtn');
  const closeModals = document.querySelectorAll('.close-modal');
  
  loginBtn.addEventListener('click', function() {
    loginModal.style.display = 'block';
    userDropdown.style.display = 'none';
  });
  
  // 注册模态框
  const registerModal = document.getElementById('registerModal');
  const registerBtn = document.getElementById('registerBtn');
  
  registerBtn.addEventListener('click', function() {
    registerModal.style.display = 'block';
    userDropdown.style.display = 'none';
  });
  
  // 关闭模态框
  closeModals.forEach(modal => {
    modal.addEventListener('click', function() {
      document.querySelectorAll('.modal').forEach(m => {
        m.style.display = 'none';
      });
    });
  });
  
  // 点击模态框外部关闭
  window.addEventListener('click', function(e) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // 登录表单提交
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');
    
    if (AuthManager.login(username, password)) {
      loginModal.style.display = 'none';
      loginForm.reset();
      errorElement.textContent = '';
    } else {
      errorElement.textContent = '用户名/邮箱或密码错误';
    }
  });
  
  // 注册表单提交
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const errorElement = document.getElementById('registerError');
    
    // 验证
    if (password !== confirmPassword) {
      errorElement.textContent = '两次输入的密码不一致';
      return;
    }
    
    if (password.length < 8) {
      errorElement.textContent = '密码长度至少8位';
      return;
    }
    
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      errorElement.textContent = '密码必须包含字母和数字';
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorElement.textContent = '请输入有效的邮箱地址';
      return;
    }
    
    // 提交注册
    const result = AuthManager.register(username, email, password);
    if (result.success) {
      registerModal.style.display = 'none';
      registerForm.reset();
      errorElement.textContent = '';
    } else {
      errorElement.textContent = result.message;
    }
  });
  
  // 退出登录
  document.getElementById('logoutBtn').addEventListener('click', function() {
    AuthManager.logout();
    userDropdown.style.display = 'none';
  });
  
  // 查看个人资料
  document.getElementById('viewProfileBtn').addEventListener('click', function() {
    if (!AuthManager.currentUser) return;
    
    const profileContent = document.getElementById('profileContent');
    const user = AuthManager.currentUser;
    
    profileContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        ${user.avatar ? `<img src="${user.avatar}" alt="头像" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">` : 
          '<div style="width: 100px; height: 100px; border-radius: 50%; background-color: #eee; margin: 0 auto; display: flex; align-items: center; justify-content: center;">暂无头像</div>'}
        <h3>${user.name || user.username}</h3>
      </div>
      <p><strong>用户名：</strong>${user.username}</p>
      <p><strong>邮箱：</strong>${user.email}</p>
    `;
    
    document.getElementById('profileModal').style.display = 'block';
    userDropdown.style.display = 'none';
  });
  
  // 编辑个人资料
  document.getElementById('editProfileBtn').addEventListener('click', function() {
    if (!AuthManager.currentUser) return;
    
    const user = AuthManager.currentUser;
    document.getElementById('editName').value = user.name || '';
    document.getElementById('editEmail').value = user.email || '';
    
    // 头像预览
    const avatarPreview = document.getElementById('avatarPreview');
    if (user.avatar) {
      avatarPreview.src = user.avatar;
      avatarPreview.style.display = 'block';
    } else {
      avatarPreview.style.display = 'none';
    }
    
    document.getElementById('editProfileModal').style.display = 'block';
    userDropdown.style.display = 'none';
  });
  
  // 头像预览
  document.getElementById('editAvatar').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const avatarPreview = document.getElementById('avatarPreview');
        avatarPreview.src = event.target.result;
        avatarPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  
  // 保存个人资料修改
  document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!AuthManager.currentUser) return;
    
    const user = { ...AuthManager.currentUser };
    const errorElement = document.getElementById('editProfileError');
    
    user.name = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const oldPassword = document.getElementById('editOldPassword').value;
    const newPassword = document.getElementById('editNewPassword').value;
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newEmail && !emailRegex.test(newEmail)) {
      errorElement.textContent = '请输入有效的邮箱地址';
      return;
    }
    
    // 检查邮箱是否已被使用
    if (newEmail && newEmail !== user.email) {
      const existingUser = DataManager.getUserByEmail(newEmail);
      if (existingUser) {
        errorElement.textContent = '该邮箱已被注册';
        return;
      }
      user.email = newEmail;
    }
    
    // 处理密码修改
    if (newPassword) {
      if (!oldPassword) {
        errorElement.textContent = '请输入原密码';
        return;
      }
      
      if (oldPassword !== user.password) {
        errorElement.textContent = '原密码不正确';
        return;
      }
      
      if (newPassword.length < 8) {
        errorElement.textContent = '密码长度至少8位';
        return;
      }
      
      if (!/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
        errorElement.textContent = '密码必须包含字母和数字';
        return;
      }
      
      user.password = newPassword;
    }
    
    // 处理头像上传
    const avatarInput = document.getElementById('editAvatar');
    if (avatarInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(event) {
        user.avatar = event.target.result;
        saveUserProfile(user);
      };
      reader.readAsDataURL(avatarInput.files[0]);
    } else {
      saveUserProfile(user);
    }
    
    function saveUserProfile(updatedUser) {
      DataManager.saveUser(updatedUser);
      AuthManager.currentUser = updatedUser;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      AuthManager.updateUserInterface();
      
      document.getElementById('editProfileModal').style.display = 'none';
      document.getElementById('editProfileForm').reset();
      errorElement.textContent = '';
    }
  });
  
  // 学校信息管理
  document.getElementById('schoolManagerBtn').addEventListener('click', function() {
    if (!AuthManager.currentUser) {
      alert('请先登录');
      return;
    }
    
    document.getElementById('schoolManagerModal').style.display = 'block';
    document.getElementById('schoolFormContainer').style.display = 'none';
    document.getElementById('schoolsList').style.display = 'block';
    SchoolManager.loadSchools();
    userDropdown.style.display = 'none';
  });
  
  // 添加新学校
  document.getElementById('addSchoolBtn').addEventListener('click', function() {
    SchoolManager.editSchool(null);
  });
  
  // 取消学校编辑
  document.getElementById('cancelSchoolBtn').addEventListener('click', function() {
    document.getElementById('schoolFormContainer').style.display = 'none';
    document.getElementById('schoolsList').style.display = 'block';
    SchoolManager.loadSchools();
  });
  
  // 保存学校信息
  document.getElementById('schoolForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      id: document.getElementById('schoolId').value,
      name: document.getElementById('schoolName').value,
      address: document.getElementById('schoolAddress').value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
      type: document.getElementById('schoolType').value,
      info: document.getElementById('schoolInfo').value,
      memories: document.getElementById('schoolMemories').value,
      videoUrl: document.getElementById('schoolVideoUrl').value,
      songUrl: document.getElementById('schoolSongUrl').value
    };
    
    const errorElement = document.getElementById('schoolFormError');
    
    // 基本验证
    if (!formData.name) {
      errorElement.textContent = '请输入学校名称';
      return;
    }
    
    if (!formData.type) {
      errorElement.textContent = '请选择学校类型';
      return;
    }
    
    // 保存学校基本信息
    const result = SchoolManager.saveSchool(formData);
    if (!result.success) {
      errorElement.textContent = result.message;
      return;
    }
    
    // 处理校徽上传
    const emblemInput = document.getElementById('schoolEmblem');
    if (emblemInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
        const schoolIndex = allSchools.findIndex(s => s.id === formData.id || 
          (s.name === formData.name && s.username === AuthManager.currentUser.username));
        
        if (schoolIndex >= 0) {
          allSchools[schoolIndex].emblem = event.target.result;
          localStorage.setItem('schools', JSON.stringify(allSchools));
        }
      };
      reader.readAsDataURL(emblemInput.files[0]);
    }
    
    // 处理照片上传
    const photosInput = document.getElementById('schoolPhotos');
    if (photosInput.files.length > 0) {
      const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
      const schoolIndex = allSchools.findIndex(s => s.id === formData.id || 
        (s.name === formData.name && s.username === AuthManager.currentUser.username));
      
      if (schoolIndex >= 0) {
        allSchools[schoolIndex].photos = allSchools[schoolIndex].photos || [];
        
        // 处理每个文件
        Array.from(photosInput.files).forEach(file => {
          const reader = new FileReader();
          reader.onload = function(event) {
            allSchools[schoolIndex].photos.push(event.target.result);
            localStorage.setItem('schools', JSON.stringify(allSchools));
          };
          reader.readAsDataURL(file);
        });
      }
    }
    
    // 处理视频上传
    const videoInput = document.getElementById('schoolVideo');
    if (videoInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
        const schoolIndex = allSchools.findIndex(s => s.id === formData.id || 
          (s.name === formData.name && s.username === AuthManager.currentUser.username));
        
        if (schoolIndex >= 0) {
          allSchools[schoolIndex].video = event.target.result;
          localStorage.setItem('schools', JSON.stringify(allSchools));
        }
      };
      reader.readAsDataURL(videoInput.files[0]);
    }
    
    // 处理音频上传
    const songInput = document.getElementById('schoolSong');
    if (songInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
        const schoolIndex = allSchools.findIndex(s => s.id === formData.id || 
          (s.name === formData.name && s.username === AuthManager.currentUser.username));
        
        if (schoolIndex >= 0) {
          allSchools[schoolIndex].song = event.target.result;
          localStorage.setItem('schools', JSON.stringify(allSchools));
        }
      };
      reader.readAsDataURL(songInput.files[0]);
    }
    
    // 重置表单并返回列表
    document.getElementById('schoolFormContainer').style.display = 'none';
    document.getElementById('schoolsList').style.display = 'block';
    SchoolManager.loadSchools();
    document.getElementById('schoolForm').reset();
    errorElement.textContent = '';
  });
  
  // 照片上传按钮
  document.getElementById('uploadPhotosBtn').addEventListener('click', function() {
    const photosInput = document.getElementById('schoolPhotos');
    if (photosInput.files.length === 0) {
      alert('请先选择要上传的照片');
      return;
    }
    
    const schoolId = document.getElementById('schoolId').value;
    if (!schoolId) {
      alert('请先保存学校基本信息');
      return;
    }
    
    const allSchools = JSON.parse(localStorage.getItem('schools') || '[]');
    const schoolIndex = allSchools.findIndex(s => s.id === schoolId);
    
    if (schoolIndex >= 0) {
      allSchools[schoolIndex].photos = allSchools[schoolIndex].photos || [];
      
      // 处理每个文件
      Array.from(photosInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
          allSchools[schoolIndex].photos.push(event.target.result);
          localStorage.setItem('schools', JSON.stringify(allSchools));
          SchoolManager.loadPhotosPreview(allSchools[schoolIndex].photos);
        };
        reader.readAsDataURL(file);
      });
      
      // 清空输入
      photosInput.value = '';
    }
  });
  
  // 校徽上传预览
  document.getElementById('schoolEmblem').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        SchoolManager.loadEmblemPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
});