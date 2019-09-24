class CameraControls {
    constructor(camera, center) {
        this.camera = camera;
        this.center = center;
        this.isOnDebugMode = true;
        this.isOnX = false;
        this.isOnY = false;
        this.isOnZ = false;
        this.enabled = true;
        this.controls = new THREE.OrbitControls(camera, center);

        this.addButtons();
        this.onYBtn(null);
    }

    moveCamera(keyCode) {
        if (this.enabled) {
            switch (keyCode) {
                case 37:
                    if (this.isOnX) {
                        this.camera.position.z += 1;
                    } else if (this.isOnY) {
                        this.camera.position.x -= 1;
                    } else if (this.isOnZ) {
                        this.camera.position.x -= 1;
                    }
                    break;
                case 38:
                    if (this.isOnX) {
                        this.camera.position.x -= 1;
                    } else if (this.isOnY) {
                        this.camera.position.z += 1;
                    } else if (this.isOnZ) {
                        this.camera.position.z += 1;
                    }
                    break;
                case 39:
                    if (this.isOnX) {
                        this.camera.position.z -= 1;
                    } else if (this.isOnY) {
                        this.camera.position.x += 1;
                    } else if (this.isOnZ) {
                        this.camera.position.x += 1;
                    }
                    break;
                case 40:
                    if (this.isOnX) {
                        this.camera.position.x += 1;
                    } else if (this.isOnY) {
                        this.camera.position.z -= 1;
                    } else if (this.isOnZ) {
                        this.camera.position.z -= 1;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    addButtons() {

        let container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '20px';
        container.style.width = '150px';
        container.style.height = '170px';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        container.style.border = 'solid';
        container.style.borderColor = 'white';
        container.style.borderWidth = '2px';
        document.body.appendChild(container);

        let title = document.createElement('p');
        title.innerText = 'Cemera Settings';
        title.style.position = 'absolute';
        title.style.color = 'white';
        title.style.left = '20px';
        title.style.top = '5px';
        container.appendChild(title);

        let xBtn = document.createElement('button');
        xBtn.style.left = '5px';
        xBtn.style.top = '30px';
        xBtn.style.backgroundColor = 'red';
        xBtn.classList.add('debugButton');
        container.appendChild(xBtn);

        let yBtn = document.createElement('button');
        yBtn.style.left = '55px';
        yBtn.style.top = '30px';
        yBtn.style.backgroundColor = '#7EFF00';
        yBtn.classList.add('debugButton');
        container.appendChild(yBtn);

        let zBtn = document.createElement('button');
        zBtn.style.left = '105px';
        zBtn.style.top = '30px';
        zBtn.style.backgroundColor = 'blue';
        zBtn.classList.add('debugButton');
        container.appendChild(zBtn);

        let upBtn = document.createElement('button');
        upBtn.innerText = 'UP';
        upBtn.style.left = '45px';
        upBtn.style.top = '60px';
        upBtn.classList.add('debugButton');
        container.appendChild(upBtn);

        let downBtn = document.createElement('button');
        downBtn.innerText = 'Down';
        downBtn.style.left = '40px';
        downBtn.style.top = '120px';
        downBtn.classList.add('debugButton');
        container.appendChild(downBtn);

        let rightBtn = document.createElement('button');
        rightBtn.innerText = '<-';
        rightBtn.style.left = '20px';
        rightBtn.style.top = '90px';
        rightBtn.classList.add('debugButton');
        container.appendChild(rightBtn);

        let leftBtn = document.createElement('button');
        leftBtn.innerText = '->';
        leftBtn.style.left = '80px';
        leftBtn.style.top = '90px';
        leftBtn.classList.add('debugButton');
        container.appendChild(leftBtn);

        let enableCheck = document.createElement('input');
        enableCheck.type = 'checkbox';
        enableCheck.style.position = 'absolute';
        enableCheck.style.left = '10px';
        enableCheck.style.top = '150px';
        container.appendChild(enableCheck);

        let enableTitle = document.createElement('p');
        enableTitle.innerText = 'Enabled';
        enableCheck.checked = this.controls.enabled;
        enableTitle.style.position = 'absolute';
        enableTitle.style.color = 'white';
        enableTitle.style.left = '28px';
        enableTitle.style.top = '148px';
        container.appendChild(enableTitle);


        xBtn.addEventListener('click', this.onXBtn.bind(this), false);
        yBtn.addEventListener('click', this.onYBtn.bind(this), false);
        zBtn.addEventListener('click', this.onZBtn.bind(this), false);

        upBtn.addEventListener('click', this.onUpBtn.bind(this), false);
        downBtn.addEventListener('click', this.onDownBtn.bind(this), false);
        rightBtn.addEventListener('click', this.onRightBtn.bind(this), false);
        leftBtn.addEventListener('click', this.onLeftBtn.bind(this), false);

        enableCheck.addEventListener('change', this.onEnableCheck.bind(this), false);


    }

    onXBtn(e) {

        if (this.enabled) {
            this.camera.position.x = 15;
            this.camera.position.z = 0;
            this.camera.position.y = 2;
            this.camera.rotation.x = 0;
            this.camera.rotation.y = this.degressToRadians(90);
            this.camera.rotation.z = 0;

            this.isOnX = true;
            this.isOnY = false;
            this.isOnZ = false;
        }
    }

    onYBtn(e) {
        if (this.enabled) {
            this.camera.position.x = 0;
            this.camera.position.z = 0;
            this.camera.position.y = 15;

            this.camera.rotation.x = this.degressToRadians(-90);
            this.camera.rotation.y = 0;
            this.camera.rotation.z = 0;

            this.isOnX = false;
            this.isOnY = true;
            this.isOnZ = false;
        }
    }

    onZBtn(e) {
        if (this.enabled) {
            this.isOnX = false;
            this.isOnY = false;
            this.isOnZ = true;

            this.camera.position.x = 0;
            this.camera.position.z = 15;
            this.camera.position.y = 2;

            this.camera.rotation.x = 0;
            this.camera.rotation.y = 0;
            this.camera.rotation.z = 0;
        }
    }

    onUpBtn() {
        this.moveCamera(38);
    }

    onDownBtn() {
        this.moveCamera(40);
    }

    onRightBtn() {
        this.moveCamera(37);
    }

    onLeftBtn() {
        this.moveCamera(39);
    }

    onEnableCheck() {
        this.enabled = !this.enabled;
        this.controls.enabled = this.enabled;
    }

    degressToRadians(degress) {
        return degress * (Math.PI / 180);
    }


}