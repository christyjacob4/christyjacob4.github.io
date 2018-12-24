(function () {
    var myp5;

    myp5 = new p5(function (p) {
        p.j = -1;
        p.cacheTriangle = '';
        p.img_copy = '';
        p.triangleSize = 250;
        p.triangleHeight = p.triangleSize * p.sqrt(3) / 2;
        p.triangles = [];
        p.cache = '';
        p.canvas = {};
        p.cnv = {};
        p.img = '';
        p.doGlitch = false;
        p.offset = 0;
        p.imgGlitch = '';
        p.doChangeImg = false;
        p.offsetChangeImg = 0;
        p.changeImgG = '';
        p.preload = function () {

            //Load the image 
            p.img = p.loadImage('assets/img/5.jpg', function () {
                console.log("Image Loaded");

                // 2000 milliseconds after the image has loaded hide the preloading screen with 
                // A fade Out Animation lasting 1500 milliseconds .
                // After the preloader is removed , change the opacity of the background to make it darker 
                // The opacity is chaged over a duration of 3000 milliseconds
                // After that the animated letters start 
                setTimeout(function () {
                    $('div.preloader').fadeOut({
                        duration: 1500,
                        complete: function () {
                            // $('div.preloader').delay(500).css("display", "none")
                            $('#kaleidoscope_canvas').animate({
                                opacity: 0.3,
                            }, {
                                duration: 3000,
                                easing: 'swing'
                            })


                            setTimeout(function () {
                                // Initialising the letters sequences to be displayed on the home screen
                                const word = ["Hey,This isChristy", "How Are YouDoing?", "Hey,This isChristy"];
                                var nextWord = 0;
                                var letters = new Letters();
                                letters.start(word[nextWord]);

                                // // Letter sequences will change every 10 seconds
                                // setInterval(function() {
                                //   nextWord++;
                                //   if ( nextWord >= word.length )
                                //     nextWord = 0;
                                //   letters.start( word[ nextWord ] );
                                // }, 10000);
                            }, 1000)


                        }
                    })
                }, 2000);


            });
        };
        p.setup = function () {
            p.initSetup();
            // setInterval((function () {
            //     return p.setDoGlitch();
            // }), 7000);
        };
        p.initSetup = function () {
            p.cnv = p.createCanvas(window.innerWidth, window.innerHeight)
            p.cnv.id('kaleidoscope_canvas')
            p.cnv_container = p.createDiv("");
            p.cnv_container.position(0, 0);
            p.cnv.parent(p.cnv_container);

            p.cnv.style('z-index', '-100');
            p.cnv_container.style('z-index', '-10');
            //   p.cnv_container.style('background', 'rgba(0,0,0, 0.75)');
            // p.cnv_container.style('opacity', '0.9');
            p.cache = new p.Cache();
            p.initTriangles();
            p.img_copy = p.createImage(p.triangleSize, p.triangleSize);
            p.cacheTriangle = p.createGraphics(p.triangleSize, p.triangleSize);
            p.cacheTriangle.strokeWeight(0);
            p.cacheTriangle.triangle(0, 0, p.triangleSize, 0, p.triangleSize / 2, p.triangleHeight);
            p.pixelDensity(1);
            // p.imgGlitch = p.createImage(p.img.width, p.img.height);
        };
        // p.setDoGlitch = function () {
        //     p.doGlitch = true;
        //     p.imgGlitch.copy(p.img, 0, 0, p.img.width, p.img.height, 0, 0, p.imgGlitch.width, p.imgGlitch.height);
        // };
        // p.glitch = function () {
        //     var draw, img;
        //     img = p.imgGlitch;
        //     draw = function () {
        //         var index, x, y;
        //         img.loadPixels();
        //         y = 0;
        //         while (y < img.height) {
        //             x = 0;
        //             while (x < img.width) {
        //                 index = (x + y * img.width) * 4;
        //                 if (img.pixels[index + 4] === void 0 || img.pixels[index + 9] === void 0) {
        //                     img.pixels[index] = 0;
        //                     img.pixels[index + 1] = 0;
        //                     img.pixels[index + 2] = 0;
        //                     img.pixels[index + 3] = 0;
        //                 } else {
        //                     img.pixels[index] = img.pixels[index + 4];
        //                     img.pixels[index + 1] = img.pixels[index + 9];
        //                 }
        //                 x++;
        //             }
        //             y++;
        //         }
        //         return img.updatePixels();
        //     };
        //     draw();
        //     if (p.offset === 5) {
        //         p.doGlitch = false;
        //         p.offset = 0;
        //     }
        // };
        p.draw = function () {
            var i, img;
            //p.print p.doChangeImg
            img = p.img;
            if (p.doGlitch) {
                p.offset += 1;
                p.glitch();
                img = p.imgGlitch;
            }
            //else
            p.cache.move();
            p.cache.cut(img);
            i = 0;
            while (i < p.triangles.length) {
                p.triangles[i].display();
                i++;
            }
            p.changeImg();
        };
        p.changeImg = function () {
            if (p.doChangeImg) {
                p.doGlitch = false;
                p.changeImgG.image(p.img_c, -p.img_c.width + p.offsetChangeImg, 0);
                //p.img.image p.img_c, 0, 0, 100, 100
                p.img = p.changeImgG;
                p.offsetChangeImg += 5;
                if ((p.offsetChangeImg - p.img_c.width) >= 0) {
                    p.doChangeImg = false;
                }
            }
        };
        p.kTriangle = function (x, y, angle, scaleX, scaleY) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.display = function () {
                p.push();
                p.translate(this.x, this.y);
                p.scale(this.scaleX, this.scaleY);
                p.rotate(this.angle);
                p.image(p.img_copy, 0, 0);
                p.pop();
            };
        };
        p.Cache = function () {
            this.x = (p.img.width - p.triangleSize) / 2;
            this.y = (p.img.height - p.triangleHeight) / 2;
            this.speedX = 0;
            this.speedY = 0;
            this.move = function () {
                var mx, my;
                mx = p.mouseX;
                my = p.mouseY;
                if (p.mouseX === 0) {
                    mx = this.x;
                    my = this.y;
                }
                this.speedX = (mx - this.x) / 20;
                this.speedY = (my - this.y) / 20;
                this.x += this.speedX;
                this.y += this.speedY;
            };
            this.cut = function (img) {
                var mx, my;
                mx = p.map(this.x, 0, p.width, 0, p.img.width - p.triangleSize);
                my = p.map(this.y, 0, p.height, 0, p.img.height - p.triangleHeight);
                p.img_copy.copy(img, mx, my, p.triangleSize, p.triangleSize, 0, 0, p.triangleSize, p.triangleSize);
                p.img_copy.mask(p.cacheTriangle);
            };
        };
        p.windowResized = function () {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            p.initSetup();
        };
        p.initTriangles = function () {
            var h, i;
            h = 0;
            while (h < p.ceil(p.height / p.triangleHeight / 2)) {
                i = 0;
                while (i < p.ceil(p.width / p.triangleSize / 3)) {
                    p.triangles[++p.j] = new p.kTriangle(0 + 3 * p.triangleSize * i, 0 + 2 * p.triangleHeight * h, p.PI / 3, -1, 1);
                    p.triangles[++p.j] = new p.kTriangle(0 + 3 * p.triangleSize * i, 0 + 2 * p.triangleHeight * h, 0, 1, 1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, -p.PI / 3, -1, 1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, p.PI / 3, -1, -1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, 0, 1, -1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 + 3 * p.triangleSize * i, 0 + 2 * p.triangleHeight * h, -p.PI / 3, -1, -1);
                    p.triangles[++p.j] = new p.kTriangle(3 * p.triangleSize + 3 * p.triangleSize * i, 0 + 2 * p.triangleHeight * h, p.PI / 3, -1, 1);
                    p.triangles[++p.j] = new p.kTriangle(0 + 3 * p.triangleSize * i, p.triangleHeight * 2 + 2 * p.triangleHeight * h, p.PI / 3, -1, -1);
                    p.triangles[++p.j] = new p.kTriangle(0 + 3 * p.triangleSize * i, p.triangleHeight * 2 + 2 * p.triangleHeight * h, 0, 1, -1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, -p.PI / 3, -1, -1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, p.PI / 3, -1, 1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 / 2 + 3 * p.triangleSize * i, p.triangleHeight + 2 * p.triangleHeight * h, 0, 1, 1);
                    p.triangles[++p.j] = new p.kTriangle(p.triangleSize * 3 + 3 * p.triangleSize * i, p.triangleHeight * 2 + 2 * p.triangleHeight * h, -p.PI / 3, -1, 1);
                    p.triangles[++p.j] = new p.kTriangle(3 * p.triangleSize + 3 * p.triangleSize * i, p.triangleHeight * 2 + 2 * p.triangleHeight * h, p.PI / 3, -1, -1);
                    i++;
                }
                h++;
            }
        };
        p5.Renderer2D._copyHelper = function (srcImage, sx, sy, sw, sh, dx, dy, dw, dh) {
            var s;
            if (srcImage instanceof p5.Image) {
                p.canvas = srcImage.canvas;
            } else if (srcImage instanceof p5.Graphics) {
                srcImage.loadPixels();
                p.canvas = srcImage.elt;
            }
            s = p.canvas.width / srcImage.width;
            this.drawingContext.drawImage(p.canvas, s * sx, s * sy, s * sw, s * sh, dx, dy, dw, dh);
        };
    });

}).call(this);