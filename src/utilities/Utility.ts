import Constant from "./Constant";

export default class Utility {
    static removeVietNamese(str: string) {
        let from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç",
            to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], "gi"), to[i]);
        }

        str = str.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/-/g, ' ');
        return str;
    }

    static formatPhoneNumber(str: string) {
        if (str && str.length >= 8) {
            str = str.replace(/.,+ ()-/g, '');
            if (str.substr(0, 2) === '84') {
                str = '0' + str.substr(2, str.length);
            } else {
                if (str.charAt(0) !== '0') {
                    str = '0' + str;
                }
            }
            Constant.phoneFormats.map((item: any) => {
                let strSplit = str.split(item.key);
                if (strSplit[0] && strSplit[0].length) {
                    str = str.replace(item.key, item.value);
                }
            });
        }

        return str;
    }

    static mysql_real_escape_quote_string (str:string) {
        str=str.replace(/\\"/g,'\\\\"').replace(/\\b/g,'');
        return str;
    }


}
