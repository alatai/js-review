$(function () {
    // 购物车商品全选/全不选
    // 全选：内部3个小复选框按钮（j-checkbox)选择状态（checked）跟着全选按钮（checkall）一致
    // 因为checked是复选框的固有属性，此时需要利用prop()方法获取和设置该属性
    // 把全选按钮状态赋值给3个小复选框即可
    // 当每次点击小复选框按钮，就需要判断：
    // 如果小复选框被选中的个数等于3就应该把全选按钮选上，否则全选按钮不选
    // :checked选择器，查找被选中的表单元素
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));

        // 购物车选中商品添加背景
        // 选中商品添加背景，不选中移除背景即可
        if ($(this).prop("checked")) {
            // 所有商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else { // 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 如果小复选框被选中的个数等于3，就应该把全选按钮选中，否则不选
    $(".j-checkbox").change(function () {
        let checkedNum = $(".j-checkbox:checked").length;
        let checkboxNum = $(".j-checkbox:checkbox").length;

        if (checkedNum === checkboxNum) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }

        if ($(this).prop("checked")) {
            // 当前商品添加check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else { // 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 购物车增减商品数量
    // 首先声明一个变量，当点击“+”，就让这个值++，然后赋值给文本框
    // 注意：只能增加本商品的数量，就是当前“+”号的兄弟文本框的值
    // 修改表单的值通过val()方法
    // 注意：这个变量初始值应该是这个文本框的值，在这个值的基础上++，要获取表单的值
    // 减号思路同理，但是如果文本框的值是1，就不能再减
    $(".increment").click(function () {
        let n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        // 购物车修改商品小计
        // 每次点击+或-，文本框的值 * 当前商品的价格
        // 注意：只能增加本商品的小计，就是当前商品的小计模块
        // 修改普通元素的内容是text()方法
        // 注意：当前商品的价格，要把￥符号去掉再相乘截取字符串substr()
        // parents("选择器")可以返回指定祖先元素
        // 最后计算的结果如果想要保留2位小数，通过toFixed(2)方法
        // 用户也可以直接修改表单里面的值，同样要计算小计。用表单change事件
        // 用最新的表单内的值乘以单价即可，但还是当前商品小计
        let p = $(this).parents(".p-num").siblings(".p-price").html().substr(1); // 当前商品的价格
        let amount = (p * n).toFixed(2);
        // $(this).parent().parent().siblings(".p-sum").html("￥" + p * n);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + amount);

        getAmount();
    });

    $(".decrement").click(function () {
        let n = $(this).siblings(".itxt").val();
        n = n > 1 ? n - 1 : n;
        $(this).siblings(".itxt").val(n);

        let p = $(this).parents(".p-num").siblings(".p-price").html().substr(1); // 当前商品的价格
        let amount = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + amount);

        getAmount();
    });

    // 用户修改文本框的值，计算小计模块
    $(".itxt").change(function () {
        let n = $(this).val();
        let p = $(this).parents(".p-num").siblings(".p-price").html().substr(1); // 当前商品的价格
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));

        getAmount();
    });

    // 购物车计算总计和总额
    // 把所有文本框里面的值相加就是总计数量，总额同理
    // 文本框里面的值不相同，如果想要相加需要用到each遍历。声明一个变量，相加即可
    // 点击+或-，会改变总计和总额，如果用户修改了文本框里面的值同样会改变总计和总额
    // 因此可以封装一个函数求总计和总额，以上两个操作调用这个函数即可
    // 注意：总计是文本框里面的值相加用val()，总额是普通元素的内容用text()
    getAmount();

    function getAmount() {
        let count = 0; // 总件数
        let amount = 0; // 总价格

        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, ele) {
            amount += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + amount.toFixed(2));
    }

    // 购物车删除商品
    // 把商品remove()删除元素即可
    // 有三个地方需要删除：①商品后面的删除按钮②删除选中的商品③清理购物车
    // 商品后面的删除按钮：一定是删除当前的商品，所以从$(this)出发
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();

        getAmount();
    });

    // 删除选中的商品：先判断小的复选框按钮是否选中状态，如果是选中，则删除对应的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();

        getAmount();
    });

    // 清理购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();

        getAmount();
    });
});