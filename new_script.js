WebFont.load({
    custom: {
        families: ['HanYiTianMaXing', 'simhei', 'SIMLI', 'JinMeiMaoCao', 'HuaKangXinZhuan', 'HanYiZhongYuan', 'Jxixinkai', 'HKwawa']
    },
    fontactive: function (familyName, fvd) {
        document.getElementById('loading').classList.remove('hidden');
        console.log('Font "' + familyName + '" has loaded.');
    },
    active: function () {
        console.log('All fonts have loaded.');
        document.getElementById('loading').classList.add('hidden');
    }
});

const canvas = document.getElementById('card-canvas');

const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('input', drawCard);
});

function resetShadow(ctx) {
    ctx.shadowColor = 'transparent'; // 清除阴影颜色
    ctx.shadowOffsetX = 0; // 清除阴影在x轴方向上的偏移量
    ctx.shadowOffsetY = 0; // 清除阴影在y轴方向上的偏移量
    ctx.shadowBlur = 0; // 清除阴影的模糊程度    
}

let cardImage = new Image();
const cardSize = {
    "maxEdge": 55,
    "fontSize": 37
}

function drawCard() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const card = document.getElementById('card');

    const faction = document.querySelector('input[name="faction"]:checked').value;
    const health = document.getElementById('health').value;

    drawCardImg(ctx);
    drawCardTopBorder(ctx, faction);
    drawCardHealth(ctx, health, faction);
    drawCardName(ctx, document.getElementById('name').value);
    drawCardTitle(ctx, document.getElementById('title').value);
    drawCardScore(ctx, document.getElementById('score').value);
    drawCardSkills(ctx, skills, faction);
    drawCardBottomBorder(ctx, faction, document.getElementById('designer').value, document.getElementById('num').value);
    drawCardQibing(ctx, qiBings, faction);
}

function drawCardTopBorder(ctx, faction) {
    const img = loadedImages[`${faction}-top`];
    ctx.drawImage(img, 0, 0, img.width, img.height);
}

function drawCardBottomBorder(ctx, faction, designer, num) {
    const img = loadedImages[`${faction}-bottom`];
    ctx.drawImage(img, 0, canvas.height - img.height, img.width, img.height);

    let x = 45;
    let y = canvas.height - 35;
    ctx.font = "bold 19px simhei";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(designer, x, y);

    x = 716;
    ctx.font = "23px simhei";

    ctx.fillText(num, x, y);
}

function drawCardHealth(ctx, health, faction) {
    const img = loadedImages[`${faction}-jade`];
    const startX = 214;
    const xOffset = 50;
    const y = 28;
    for (let i = 0; i < health; i++) {
        ctx.drawImage(img, startX + i * xOffset, y, 55, 60);
    }
}

function drawCardImg(ctx) {
    // 绘制图像
    if (cardImage.complete) { // 如果图片已加载完成，绘制图片
        ctx.drawImage(cardImage, 0, 105, canvas.width, canvas.height - 170);
    }
}

function uploadImage(event) {
    // 获取上传的图片文件
    const file = event.target.files[0];
    // 创建 FileReader 对象以读取图片
    const reader = new FileReader();
    // 当读取操作成功完成时触发
    reader.onload = function (e) {
        // 显示 loading 元素
        document.getElementById('loading').classList.remove('hidden');
        // 当图像加载完成时触发
        cardImage.onload = function () {
            // 隐藏 loading 元素
            document.getElementById('loading').classList.add('hidden');
            // 调用 drawCard() 函数绘制图片
            drawCard();
        };
        // 设置图像源
        cardImage.src = e.target.result;
    };
    // 读取文件并将其转换为 DataURL
    reader.readAsDataURL(file);
}

/* let cropper;

// 处理图片上传
function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageToCrop = document.getElementById("image-to-crop");
            imageToCrop.src = e.target.result;
            imageToCrop.style.display = "block";

            imageToCrop.onload = function () {
                const imageWidth = this.naturalWidth;
                const imageHeight = this.naturalHeight;

                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(imageToCrop, {
                    aspectRatio: 942 / 1322,
                    minContainerWidth: 300,
                    minContainerHeight: 450,
                    minCropBoxWidth: 300,
                    minCropBoxHeight: 450,
                    // Set the maximum canvas dimensions based on the image size
                    maxCanvasWidth: imageWidth,
                    maxCanvasHeight: imageHeight,
                    crop(event) {
                        // handle cropping event
                    },
                });
            };

            const cropAndUploadButton = document.getElementById("crop-and-upload");
            cropAndUploadButton.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

// 裁剪并上传图片
function cropAndUpload() {
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedImageDataURL = croppedCanvas.toDataURL("image/png");
        cardImage.onload = function () {
            document.getElementById('loading').classList.add('hidden');
            drawCard();
        };
        cardImage.src = croppedImageDataURL;
        drawCard();

        cropper.destroy();
        cropper = null;
        const imageToCrop = document.getElementById("image-to-crop");
        imageToCrop.style.display = "none";
        const cropAndUploadButton = document.getElementById("crop-and-upload");
        cropAndUploadButton.style.display = "none";
    }
} */

function drawCardName(ctx, name) {
    let x = 131;
    let yStart;
    let yOffset;
    if (name.length == 2) {
        yStart = 397;
        yOffset = 108;
    } else {
        yStart = 343;
        yOffset = 108;
    }
    ctx.font = "91px JinMeiMaoCao";

    //绘制阴影
    ctx.shadowColor = "rgba(41, 66, 73, 1)"; // 设置阴影颜色
    ctx.shadowBlur = 0; // 设置阴影模糊程度
    ctx.shadowOffsetX = 6; // 水平偏移量
    ctx.shadowOffsetY = 9; // 垂直偏移量
    for (let i = 0; i < name.length; i++) {
        ctx.fillText(name[i], x, yStart + yOffset * i);
    }
    resetShadow(ctx);

    //外侧两像素白色描边
    ctx.lineWidth = 10;
    ctx.strokeStyle = "white";
    for (let i = 0; i < name.length; i++) {
        ctx.strokeText(name[i], x, yStart + yOffset * i);
    }

    //黑色底色
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for (let i = 0; i < name.length; i++) {
        ctx.strokeText(name[i], x, yStart + yOffset * i);
        ctx.fillText(name[i], x, yStart + yOffset * i);
    }

    //前景白色
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    for (let i = 0; i < name.length; i++) {
        ctx.fillText(name[i], x, yStart + yOffset * i);
    }
}

function drawCardTitle(ctx, title) {
    let x = 82;
    let yStart = 280;
    let yOffset = 46;
    ctx.font = "42px HuaKangXinZhuan";

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for (let i = 0; i < title.length; i++) {
        ctx.fillText(title[i], x, yStart + yOffset * i);
    }
}

function drawCardScore(ctx, score) {
    const x = 122;
    const y = 204;
    ctx.font = "195px Jxixinkai";

    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.strokeText(score, x, y);
    ctx.fillText(score, x, y);
}

function drawCardSkills(ctx, skills, faction) {
    const maxWidth = cardSize["maxEdge"];//最大边缘宽度
    const minWidth = 15;//最小边缘宽度

    const maxMaskY = 957;//遮罩最低高度
    const bottomMaskY = canvas.height - 96;//遮罩区最低处Y坐标

    //计算技能文字区域总体高度
    let textAreaHeight = 0;
    if (skills.length > 0) {
        skills.forEach(skill => {
            textAreaHeight += getSkillAreaHeight(ctx, skill);
            textAreaHeight += 2 * minWidth;//多个技能时增加两倍最小间距
        });
        textAreaHeight -= 2 * minWidth;
    }

    //顶部边缘宽度
    let topEdge;
    //遮罩区起始Y坐标
    let startY

    if (textAreaHeight <= (bottomMaskY - maxMaskY - 2 * maxWidth)) {
        //技能区域小于最小宽度：使用最大边缘宽度
        startY = maxMaskY;
        topEdge = maxWidth;
    } else if (textAreaHeight > (bottomMaskY - maxMaskY - 2 * maxWidth) && textAreaHeight <= (bottomMaskY - maxMaskY - 2 * minWidth)) {
        //技能区域大于最小宽度，小于未扩展最大宽度：均分上下边框宽度
        startY = maxMaskY;
        topEdge = (bottomMaskY - maxMaskY - textAreaHeight) / 2;
    } else {
        //技能区域大于未扩展最大宽度：向上扩展起始Y坐标
        startY = maxMaskY - (textAreaHeight - (bottomMaskY - maxMaskY - 2 * minWidth));
        topEdge = (bottomMaskY - startY - textAreaHeight) / 2;
    }

    for (let i = 0; i < skills.length; i++) {
        let skill = skills[i];

        let skillHeight = getSkillAreaHeight(ctx, skill);

        let maskEndY;
        if (i == skills.length - 1) {
            //最后一个遮罩区覆盖剩余部分   
            maskEndY = canvas.height;
        } else {
            maskEndY = startY + topEdge + skillHeight + minWidth;
        }
        drawCardSkillMask(ctx, startY, maskEndY, i);
        drawSkillName(ctx, skill, faction, startY, topEdge);
        skill.effects.forEach(effect => {
            drawEffectTrigger(ctx, effect, startY, topEdge);
            let line = drawEffectText(ctx, effect, startY, topEdge, true);
            startY += line * cardSize["fontSize"] + (line - 1) * 13;
            topEdge += 13;
        })
        startY = maskEndY;
        topEdge = minWidth;
    }
}

function drawCardSkillMask(ctx, startY, maskEndY, i) {
    if (i % 2 == 0) {
        ctx.globalAlpha = 0.6;
    } else {
        ctx.globalAlpha = 0.8;
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, startY, canvas.width, maskEndY - startY);
    ctx.globalAlpha = 1;
}

const factionLineColor = {
    "wei": "rgb(24, 97, 153)", "shu": "rgb(162, 49, 27)", "wu": "rgb(42, 125, 42)", "qun": "rgb(130, 118, 93)"
}

function drawSkillName(ctx, skill, faction, startY, topEdge) {
    let backgroundColor = "black";
    let lineColor = "white";
    let fontColor = "white";

    if (skill.type == "normal") {
        backgroundColor = "rgb(250, 236, 193)";
        lineColor = factionLineColor[faction];
        fontColor = "black";
    }

    //技能底框
    //起始坐标
    let start = { "x": cardSize["maxEdge"], "y": startY + topEdge };

    //技能标签属性
    let width = 110;
    let height = 38;
    //最右侧顶点额外宽度
    let triangleWidth = 18;

    let top = { "x": start.x + width, "y": start.y };
    let bottom = { "x": start.x + width, "y": start.y + height };
    let right = { "x": start.x + width + triangleWidth, "y": start.y + height / 2 };

    //阴影属性
    ctx.shadowColor = "black"; // 设置阴影颜色
    ctx.shadowBlur = 10; // 设置阴影模糊程度
    ctx.shadowOffsetX = 0; // 水平偏移量
    ctx.shadowOffsetY = 0; // 垂直偏移量

    ctx.fillStyle = backgroundColor;
    ctx.beginPath(); // 开始路径
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(top.x, top.y);
    ctx.lineTo(right.x, right.y);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.lineTo(start.x, start.y + height);
    ctx.closePath();
    ctx.fill();
    resetShadow(ctx);

    //内标三角
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(right.x - triangleWidth, right.y);
    ctx.lineTo(right.x - triangleWidth - 7, right.y - 7);
    ctx.lineTo(right.x - triangleWidth - 7, right.y + 7);
    ctx.closePath();
    ctx.fill();

    //标线绘制
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath(); // 开始路径
    ctx.moveTo(start.x + 5, start.y); // 移动到起点
    ctx.lineTo(start.x + 5, start.y + height); // 从起点连接到终点
    ctx.stroke(); // 绘制路径

    ctx.beginPath();
    ctx.moveTo(start.x, start.y + 5);
    ctx.lineTo(top.x - 5, top.y + 5);
    ctx.lineTo(right.x - 10, right.y);
    ctx.lineTo(bottom.x - 5, bottom.y - 5);
    ctx.lineTo(start.x, start.y + height - 5);
    ctx.stroke();

    //文字绘制
    //起始坐标
    let x = 111;
    let y = startY + topEdge + 31;
    ctx.font = cardSize["fontSize"] + "px SIMLI";
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";
    ctx.fillText(skill.name, x, y);
}

function drawEffectTrigger(ctx, effect, startY, topEdge) {
    let backgroundColor = { "触发": "rgb(55, 100, 200)", "主动": "rgb(175, 0, 0)", "持续": "rgb(41, 129, 74)" }
    let nums = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"]

    //计算文字宽度
    ctx.font = cardSize["fontSize"] + "px HanYiZhongYuan";
    let text = effect.trigger;
    if (effect.count > 0) {
        text += nums[effect.count - 1];
    }
    let textWidth = ctx.measureText(text).width;

    //绘制矩形
    let x = 211;
    let y = startY + topEdge - 2;
    let width = textWidth + 46;
    let height = 41;

    ctx.fillStyle = backgroundColor[effect.trigger];
    ctx.fillRect(x, y, width, height);

    //绘制半圆
    ctx.beginPath();
    ctx.arc(x + 6, y + height / 2, 18, Math.PI / 2, Math.PI * 1.5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + width - 6, y + height / 2, 18, Math.PI * 1.5, Math.PI / 2);
    ctx.closePath();
    ctx.fill();

    //文字绘制
    //起始坐标
    let textX = 193;
    let textY = startY + topEdge + 31;

    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    ctx.font = cardSize["fontSize"] + "px HKwawa";
    ctx.fillText("【", textX, textY);

    ctx.font = cardSize["fontSize"] + "px HanYiZhongYuan";
    ctx.fillText(text, textX + cardSize["fontSize"] + 4, textY - 2);

    ctx.font = cardSize["fontSize"] + "px HKwawa";
    ctx.fillText("】", textX + cardSize["fontSize"] + 8 + textWidth, textY);
}

function drawEffectText(ctx, effect, startY, topEdge, fillText) {
    ctx.textAlign = "left";
    const sideEdgeWidth = cardSize["maxEdge"];
    const x = 351;
    const y = startY + topEdge + 29;
    let beginX = x;
    let beginY = y;

    if (effect.count > 0) {
        beginX += cardSize["fontSize"];//发动次数像素偏移
    }
    let lineNum = 1;
    for (let i = 0; i < effect.description.length;) {
        //重置文字样式
        ctx.font = cardSize["fontSize"] + "px HanYiZhongYuan";
        ctx.fillStyle = "black";

        let char = effect.description[i];
        let text = char;
        if (char == "{") {
            for (let j = i + 1; j < effect.description.length; j++) {
                text += effect.description[j];
                if (effect.description[j] == "}")
                    break;
            }
        }
        i += text.length;

        let img = null;
        if (text == "{黑色}") {
            ctx.font = "bold " + cardSize["fontSize"] + "px HanYiZhongYuan";
            ctx.fillStyle = "black";
            text = "黑色"
        } else if (text == "{红色}") {
            ctx.font = "bold " + cardSize["fontSize"] + "px HanYiZhongYuan";
            ctx.fillStyle = "rgb(240, 0, 0)";
            text = "红色"
        } else if (text == "{青龙}") {
            img = loadedImages["spade"];
        } else if (text == "{白虎}") {
            img = loadedImages["club"];
        } else if (text == "{朱雀}") {
            img = loadedImages["heart"];
        } else if (text == "{玄武}") {
            img = loadedImages["diamond"];
        }
        if (img) {
            if (beginX + cardSize.fontSize > canvas.width - sideEdgeWidth) {
                beginX = sideEdgeWidth;
                beginY = beginY + 13 + cardSize["fontSize"];
                lineNum++;
            }
            if (fillText) {
                ctx.drawImage(img, beginX, beginY - cardSize["fontSize"] + 7, cardSize["fontSize"], cardSize["fontSize"]);
            }
            beginX += cardSize["fontSize"];
            continue;
        }
        //TODO 判定结果绘图

        for (let j = 0; j < text.length; j++) {
            let char = text[j];
            let position = getTextBounds(ctx, char, beginX, beginY);
            //超宽换行
            if (position.x + position.width > canvas.width - sideEdgeWidth) {
                beginX = sideEdgeWidth;
                beginY = position.y + position.height + 13 + cardSize["fontSize"];
                lineNum++;
            }
            position = getTextBounds(ctx, char, beginX, beginY);
            if (fillText) {
                if (char == "【") {
                    ctx.font = cardSize["fontSize"] + "px HKwawa";
                    //起始向左偏移4像素
                    beginX -= 4;
                    //文字向下偏移2像素
                    ctx.fillText(char, beginX, beginY + 2);
                    ctx.font = cardSize["fontSize"] + "px HanYiZhongYuan";
                } else if (char == "】") {
                    ctx.font = cardSize["fontSize"] + "px HKwawa";
                    //起始向右偏移4像素
                    beginX += 4;
                    //文字向下偏移2像素
                    ctx.fillText(char, beginX, beginY + 2);
                    ctx.font = cardSize["fontSize"] + "px HanYiZhongYuan";
                } else {
                    ctx.fillText(char, beginX, beginY);
                }
            }
            beginX = position.x + position.width;
        }
    }
    return lineNum;
}

function getSkillAreaHeight(ctx, skill) {
    let line = 0;
    skill.effects.forEach(effect => {
        line += drawEffectText(ctx, effect, 0, 0, false);
    })
    return line * cardSize["fontSize"] + (line - 1) * 13;//行高
}

function getTextBounds(ctx, text, x, y) {
    var metrics = ctx.measureText(text);
    var width = metrics.width;
    var height = cardSize["fontSize"];

    return {
        x: x,
        y: y - height,
        width: width,
        height: height
    };
}

function drawCardQibing(ctx, qiBings, faction) {
    ctx.font = "109px SIMLI";

    let xStart = 834;
    let xOffset = 135;
    let y = 137;

    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";


    for (let i = 0; i < qiBings.length; i++) {
        const img = loadedImages[`${faction}-qb-bg`];
        ctx.drawImage(img, xStart - i * xOffset - 75, y - 107, 149, 149);
        ctx.strokeText(qiBings[i], xStart - i * xOffset, y);
        ctx.fillText(qiBings[i], xStart - i * xOffset, y);
    }
}

//奇兵事件处理
const qiBingInput = document.getElementById('qi-bing');
const qiBingList = document.getElementById('qi-bing-list');
const qiBings = [];
const qiBingMap = { "杀": "殺", "闪": "閃", "决": "決", "风": "風" }

function addQiBing() {
    if (qiBingInput.value.trim() !== '') {
        let qibing = qiBingInput.value.trim();
        let fan = qiBingMap[qibing];
        if (fan != undefined && fan.length > 0) {
            qibing = fan;
        }
        qiBings.push(qibing);
        updateqiBingList();
        qiBingInput.value = '';
    }
}

qiBingInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addQiBing(); // 调用新创建的 addQiBing 函数
    }
});

function updateqiBingList() {
    qiBingList.innerHTML = qiBings.map((qiBing, index) => `<span draggable="true" ondragstart="dragStart(event, ${index})">${qiBing} <button class="qi-bing-remove-btn" type="button" onclick="removeqiBing(${index})">删除</button></span>`).join('');
    drawCard();
}

qiBingList.addEventListener('dragover', (event) => {
    event.preventDefault();
});

qiBingList.addEventListener('drop', (event) => {
    event.preventDefault();
    const targetIndex = Array.from(qiBingList.children).indexOf(event.target);
    if (draggedIndex !== targetIndex) {
        qiBings.splice(targetIndex, 0, qiBings.splice(draggedIndex, 1)[0]);
        updateqiBingList();
    }
});

let draggedIndex = null;

function dragStart(event, index) {
    draggedIndex = index;
    event.dataTransfer.effectAllowed = 'move';
}

function removeqiBing(index) {
    qiBings.splice(index, 1);
    updateqiBingList();
}

// 技能事件处理
const skills = [];
const skillList = document.getElementById('skill-list');
const addSkillButton = document.getElementById('add-skill');

addSkillButton.addEventListener('click', () => {
    const newSkill = {
        type: 'normal',
        effects: [
            {
                trigger: '触发',
                count: '',
                countEnabled: false,
                description: '',
            },
        ],
        name: '',
        designer: '',
        num: '',
    };
    skills.push(newSkill);
    updateSkillList();
});

function updateSkill(skillIndex, key, value) {
    skills[skillIndex][key] = value;
    drawCard();
}

function updateEffect(skillIndex, effectIndex, key, value) {
    skills[skillIndex].effects[effectIndex][key] = value;
    drawCard();
}

function removeSkill(index) {
    // 显示自定义确认对话框
    const confirmDialog = document.getElementById('confirm-dialog');
    confirmDialog.classList.remove('hidden');

    // 获取确定按钮和取消按钮
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');

    // 移除旧的事件监听器
    confirmYesButton.onclick = null;
    confirmNoButton.onclick = null;

    // 为确定按钮添加新的事件监听器
    confirmYesButton.onclick = function () {
        console.log("remove:", index);
        skills.splice(index, 1);
        updateSkillList();
        confirmDialog.classList.add('hidden');
    };

    // 为取消按钮添加新的事件监听器
    confirmNoButton.onclick = function () {
        confirmDialog.classList.add('hidden');
    };
}

function updateSkillList() {
    skillList.innerHTML = skills.map((skill, skillIndex) => {
        const effects = skill.effects
            .map(
                (effect, effectIndex) => `
                    <fieldset>
                        <legend>效果 ${effectIndex + 1}</legend>
                        <label class="radio-label"><input type="radio" name="effect-trigger-${skillIndex}-${effectIndex}" value="触发" ${effect.trigger === '触发' ? 'checked' : ''} oninput="updateEffect(${skillIndex}, ${effectIndex}, 'trigger', this.value)"> 触发</label>
                        <label class="radio-label"><input type="radio" name="effect-trigger-${skillIndex}-${effectIndex}" value="主动" ${effect.trigger === '主动' ? 'checked' : ''} oninput="updateEffect(${skillIndex}, ${effectIndex}, 'trigger', this.value)"> 主动</label>
                        <label class="radio-label"><input type="radio" name="effect-trigger-${skillIndex}-${effectIndex}" value="持续" ${effect.trigger === '持续' ? 'checked' : ''} oninput="updateEffect(${skillIndex}, ${effectIndex}, 'trigger', this.value)"> 持续</label>
                        <br>
                        <label>发动次数:</label>
                        <label><input type="checkbox" id="effect-count-toggle-${skillIndex}-${effectIndex}" oninput="toggleEffectCount(${skillIndex}, ${effectIndex})" ${effect.countEnabled ? 'checked' : ''}> </label>
                        <input type="number" id="effect-count-${skillIndex}-${effectIndex}" value="${effect.count}" oninput="updateEffect(${skillIndex}, ${effectIndex}, 'count', this.value)" ${effect.countEnabled ? '' : 'disabled'}>
                        <br>
                        <label for="effect-description-${skillIndex}-${effectIndex}">效果描述:</label>
                        <br>
                        <textarea rows="3" id="effect-description-${skillIndex}-${effectIndex}" value="${effect.description}" oninput="updateEffect(${skillIndex}, ${effectIndex}, 'description', this.value)">${effect.description}</textarea>
                        <div id="preset-buttons">
                            <button type="button" onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex}, '{黑色}')">黑色</button>
                            <button type="button" onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex}, '{红色}')">红色</button>
                            <button type="button"  onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex},'{青龙}')">黑桃/青龙</button>
                            <button type="button"  onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex},'{白虎}')">草花/白虎</button>
                            <button type="button"  onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex},'{朱雀}')">红桃/朱雀</button>
                            <button type="button"  onclick="appendTextToEffectDescription(${skillIndex}, ${effectIndex},'{玄武}')">方块/玄武</button>
                        </div>
                        <button type="button" class="delete-btn" onclick="removeEffect(${skillIndex}, ${effectIndex})">删除效果</button>
                    </fieldset>
                `,
            )
            .join('');

        return `
            <div>
                <fieldset>
                    <legend>技能 ${skillIndex + 1}</legend>
                    <label class="radio-label"><input type="radio" name="skill-type-${skillIndex}" value="normal" ${skill.type === 'normal' ? 'checked' : ''} oninput="updateSkill(${skillIndex}, 'type', this.value)"> 普通技能</label>
                    <label class="radio-label"><input type="radio" name="skill-type-${skillIndex}" value="ambush" ${skill.type === 'ambush' ? 'checked' : ''} oninput="updateSkill(${skillIndex}, 'type', this.value)"> 伏击技能</label>
                    <br>
                    <label for="skill-name-${skillIndex}">技能名称:</label>
                    <input type="text" id="skill-name-${skillIndex}" value="${skill.name}" oninput="updateSkill(${skillIndex}, 'name', this.value)">
                    <br>
                    ${effects}
                    <br>
                    <button type="button" onclick="addEffect(${skillIndex})">添加效果</button>
                    <button type="button" class="delete-btn" onclick="removeSkill(${skillIndex})">删除技能</button>
                </fieldset>
            </div>
            `;
    }).join('');
    drawCard();
}

function addEffect(skillIndex) {
    const newEffect = {
        trigger: '触发',
        countEnabled: false,
        count: '',
        description: '',
    };
    skills[skillIndex].effects.push(newEffect);
    updateSkillList();
}

function removeEffect(skillIndex, effectIndex) {
    // 显示自定义确认对话框
    const confirmDialog = document.getElementById('confirm-dialog');
    confirmDialog.classList.remove('hidden');

    // 获取确定按钮和取消按钮
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');

    // 移除旧的事件监听器
    confirmYesButton.onclick = null;
    confirmNoButton.onclick = null;

    // 为确定按钮添加新的事件监听器
    confirmYesButton.onclick = function () {
        console.log("remove effect:", skillIndex, effectIndex);
        skills[skillIndex].effects.splice(effectIndex, 1);
        updateSkillList();
        confirmDialog.classList.add('hidden');
    };

    // 为取消按钮添加新的事件监听器
    confirmNoButton.onclick = function () {
        confirmDialog.classList.add('hidden');
    };
}

function toggleEffectCount(skillIndex, effectIndex) {
    const toggle = document.getElementById(`effect-count-toggle-${skillIndex}-${effectIndex}`);
    const input = document.getElementById(`effect-count-${skillIndex}-${effectIndex}`);
    if (toggle.checked) {
        input.removeAttribute('disabled');
        input.value = 1;
        updateEffect(skillIndex, effectIndex, 'count', 1);
        updateEffect(skillIndex, effectIndex, 'countEnabled', true);
    } else {
        input.setAttribute('disabled', true);
        input.value = '';
        updateEffect(skillIndex, effectIndex, 'count', null);
        updateEffect(skillIndex, effectIndex, 'countEnabled', false);
    }
}

function appendTextToEffectDescription(skillIndex, effectIndex, text) {
    const effectDescriptionInput = document.getElementById(`effect-description-${skillIndex}-${effectIndex}`);
    effectDescriptionInput.value += text;
    updateEffect(skillIndex, effectIndex, "description", effectDescriptionInput.value);
}

function loadImage(filename) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = filename;
        img.onload = () => {
            resolve(img);
        };
    });
}

function loadImages(imageFilenames) {
    const promises = [];

    for (const key in imageFilenames) {
        const url = './resources/' + imageFilenames[key];
        promises.push(loadImage(url).then((img) => ({ key, img })));
    }

    return Promise.all(promises);
}

const imageFilenames = {
    "shu-top": "shu-top.png",
    "shu-bottom": "shu-bottom.png",
    "shu-qb-bg": "shu-qb-bg.png",
    "shu-jade": "shu-jade.png",
    "wu-top": "wu-top.png",
    "wu-bottom": "wu-bottom.png",
    "wu-qb-bg": "wu-qb-bg.png",
    "wu-jade": "wu-jade.png",
    "wei-top": "wei-top.png",
    "wei-bottom": "wei-bottom.png",
    "wei-qb-bg": "wei-qb-bg.png",
    "wei-jade": "wei-jade.png",
    "qun-top": "qun-top.png",
    "qun-bottom": "qun-bottom.png",
    "qun-qb-bg": "qun-qb-bg.png",
    "qun-jade": "qun-jade.png",
    "spade": "spade.png",
    "heart": "heart.png",
    "club": "club.png",
    "diamond": "diamond.png"
};
const loadedImages = {};

document.getElementById('save-image').addEventListener('click', function () {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = image;
    let name = document.getElementById('name').value;
    if (!name) {
        name = 'card';
    }
    link.download = 'card.png';
    link.click();
});

window.onload = function () {
    loadImages(imageFilenames)
        .then((imageList) => {
            imageList.forEach(({ key, img }) => {
                loadedImages[key] = img;
            });
            drawCard();
        })
        .catch((error) => {
            console.error('Error loading images:', error);
        });
};