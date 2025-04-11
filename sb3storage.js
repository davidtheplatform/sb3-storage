
(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('The sb3 storage extension must run unsandboxed');
    }

    // https://stackoverflow.com/a/60467595/20218130
    function md5(inputString) {
        var hc = "0123456789abcdef";
        function rh(n) { var j, s = ""; for (j = 0; j <= 3; j++) s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F); return s; }
        function ad(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF); var m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
        function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
        function cm(q, a, b, x, s, t) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
        function ff(a, b, c, d, x, s, t) { return cm((b & c) | ((~b) & d), a, b, x, s, t); }
        function gg(a, b, c, d, x, s, t) { return cm((b & d) | (c & (~d)), a, b, x, s, t); }
        function hh(a, b, c, d, x, s, t) { return cm(b ^ c ^ d, a, b, x, s, t); }
        function ii(a, b, c, d, x, s, t) { return cm(c ^ (b | (~d)), a, b, x, s, t); }
        function sb(x) {
            var i; var nblk = ((x.length + 8) >> 6) + 1; var blks = new Array(nblk * 16); for (i = 0; i < nblk * 16; i++) blks[i] = 0;
            for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
            blks[i >> 2] |= 0x80 << ((i % 4) * 8); blks[nblk * 16 - 2] = x.length * 8; return blks;
        }
        var i, x = sb("" + inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
        for (i = 0; i < x.length; i += 16) {
            olda = a; oldb = b; oldc = c; oldd = d;
            a = ff(a, b, c, d, x[i + 0], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = ff(b, c, d, a, x[i + 3], 22, -1044525330); a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983); a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = ff(b, c, d, a, x[i + 15], 22, 1236535329); a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i + 0], 20, -373897302); a = gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = gg(b, c, d, a, x[i + 8], 20, 1163531501); a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734); a = hh(a, b, c, d, x[i + 5], 4, -378558);
            d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = hh(b, c, d, a, x[i + 10], 23, -1094730640); a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189); a = hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = ii(a, b, c, d, x[i + 0], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = ii(b, c, d, a, x[i + 5], 21, -57434055); a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799); a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = ii(b, c, d, a, x[i + 9], 21, -343485551); a = ad(a, olda); b = ad(b, oldb); c = ad(c, oldc); d = ad(d, oldd);
        }
        return rh(a) + rh(b) + rh(c) + rh(d);
    }

    function numToUint8Array(num) {
        let arr = new Uint8Array(8);

        for (let i = 0; i < 8; i++) {
            arr[i] = num % 256;
            num = Math.floor(num / 256);
        }

        return arr.slice(4);
    }

    function uint8ArrayToNumV2(arr) {
        let num = 0;

        for (let i = 7; i >= 0; i--) {
            num = num * 256 + arr[i];
        }

        return num;
    }

    // https://stackoverflow.com/a/18639999/20218130
    var makeCRCTable = function () {
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++) {
            c = n;
            for (var k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    }
    let crcTable = makeCRCTable();

    var crc32_g = function (str) {
        var crc = 0 ^ (-1);

        for (var i = 0; i < str.length; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str[i]) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    };


    // initialize
    let files = {}

    let old_saveProjectSb3 = Scratch.vm.saveProjectSb3;

    Scratch.vm.saveProjectSb3 = function (...args) {
        return Scratch.vm.addSprite({ name: "__twext_sb3storage_container", isStage: false, blocks: {}, costumes: [{ name: "__twext_sb3storage_blank", assetId: "cd21514d0531fdffb22204e0ec5ed84a", dataFormat: "svg" }], sounds: [], variables: {} })
            .then(() => {
                var container = Scratch.vm.runtime.getSpriteTargetByName("__twext_sb3storage_container");

                Object.keys(files).forEach(function (file) {
                    var output = new TextEncoder().encode(files[file]);

                    var md5hash = md5(file);

                    var asset = { data: output, assetId: md5hash, assetType: { contentType: "image/png", immutable: true, name: "ImageBitmap", runtimeFormat: "png" }, clean: true, dataFormat: "png", dependencies: [] };
                    var costume = { asset: asset, assetId: md5hash, bitmapResolution: 1, dataFormat: "png", md5: md5hash + ".png", name: file, rotationCenterX: 0, rotationCenterY: 0, size: [1, 1], skinId: 1 };

                    container.addCostume(costume);
                });
            })
            .then(() => {
                return old_saveProjectSb3.apply(this, args)
                    .then((val) => {
                        Scratch.vm.deleteSprite(Scratch.vm.runtime.getSpriteTargetByName("__twext_sb3storage_container").id);
                        return val;
                    });
            });
    };

    class SB3Storage {
        files;
        has_initialized;

        constructor() {
            this.files = [];
        }

        getInfo() {
            this.initialize();

            return {
                id: 'sb3storage',
                name: 'SB3 data storage',
                color1: '#00a4bd',
                color2: '#186b78',
                color3: '#1b3f45',
                blocks: [
                    {
                        opcode: 'write',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'write [CONTENT] to [FILE]',
                        arguments: {
                            CONTENT: {
                                type: Scratch.ArgumentType.STRING
                            },
                            FILE: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'read',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'read file [FILE]',
                        arguments: {
                            FILE: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'read_offset',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'read file [FILE] offset [OFFSET]',
                        arguments: {
                            FILE: {
                                type: Scratch.ArgumentType.STRING
                            },
                            OFFSET: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'read_range',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'read file [FILE] from [START] to [END]',
                        arguments: {
                            FILE: {
                                type: Scratch.ArgumentType.STRING
                            },
                            START: {
                                type: Scratch.ArgumentType.STRING
                            },
                            END: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'delete',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete [FILE]',
                        arguments: {
                            FILE: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                ]
            };
        }

        initialize() {
            if (this.has_initialized) return;
            this.has_initialized = true;

            Scratch.vm.runtime.on("PROJECT_LOADED", () => {
                var container;
                Scratch.vm.runtime.targets.forEach((target) => {
                    if (target.sprite.name == "__twext_sb3storage_container") {
                        container = target;
                    }
                });

                if (container) {
                    var failed = false;
                    container.sprite.costumes.forEach((costume) => {
                        if (costume.name == '__twext_sb3storage_blank') return;

                        try {
                            files[costume.name] = new TextDecoder().decode(costume.broken.asset.data);
                        } catch (e) {
                            console.log(e);
                            failed = true;
                        }
                    });

                    if (failed) {
                        alert("[SB3 Storage] Some files in the project failed to load. The project may be corrupted, or there is a bug in the SB3 storage extension. Continue at your own risk.");
                    }

                    Scratch.vm.deleteSprite(container.id);
                }

                console.log("SB3 Storage initialized");
            });
        }

        hello() {
            return 'World!';
        }

        write(args) {
            files[args.FILE] = args.CONTENT;
        }

        read(args) {
            if (files.hasOwnProperty(args.FILE)) return files[args.FILE];
            return "";
        }

        read_offset(args) {
            if (files.hasOwnProperty(args.FILE)) {
                return files[args.FILE].slice(args.OFFSET, args.OFFSET + 1);
            }
            return "";
        }

        read_range(args) {
            if (files.hasOwnProperty(args.FILE)) {
                return files[args.FILE].slice(args.START, args.END);
            }
        }

        delete(args) {
            if (files.hasOwnProperty(args.FILE)) delete files[args.FILE];
        }
    }
    Scratch.extensions.register(new SB3Storage());
})(Scratch);
