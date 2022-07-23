<html>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
  />
  <head>
    <style>

      
    </style>
  </head>
  <body>
    <header>
      <table
        cellspacing="0"
        cellpadding="0"
        style="padding: 2px;margin: 0 auto;background-color: #F9F9F9;padding-bottom: 0;top: 16px;"
        width="600px"
      >
        <tbody style="background-color: #ffffff;">
          <tr>
            <td align="left">
              <img
                src="<%=data.logoUrl%>"
                style="display: -webkit-box;margin: 0 16px;padding: 8 0px 8 0px; height: 80px;"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </header>
<!-- <head>
  
  <title>
    <%=data.orderNo %>
  </title>
  
</head> -->
  <div class="container-panel">
    <div>
      <div id="container-pdf">
        <table border:none width="100%" cellspacing="0" cellpadding="5" style="
              background: #f1f1f2;
              font-family: Helvetica;
            ">

          <tr style="background: #ffffff;border-style: #ffffff;">
            <td colspan="5">
              <div style="width: 100%;text-align: center;">
                <div style="text-align: center;display: -webkit-inline-box; padding-top: 76px;">
                  <div style="
              font-size: 36px;
              font-family: DFYuanMedium-B5;
              line-height: 38px;
              ">發票</div>
                  <div style="
              padding-left: 5px;
              font-size: 42px;
              font-family: Helvetica Neue;
              font-weight: bold;
              line-height: 36px;
            "><strong>Invoice</strong></div>
                </div>
              </div>
              <div style="height: 32px;"></div>
            </td>
          </tr>
          <tr style="background: #ffffff;border-style: #ffffff;border:none;">
            <td colspan="1" style="font-family: DFYuanMedium-B5;font-size: 14px;border:none;">
              <div style="
                    font-family: DFYuanMedium-B5;margin-left: 25%;line-height: 18px;">致：</span><span
                  style="font-family: Helvetica;">
                  <%=data.userName%>
              </div>
              <div style="
                      font-family: Helvetica;margin-left: 25%"> To</div>
            </td>

            <td colspan="2" style="font-size: 14px;">
              <div style="
                font-family: DFYuanMedium-B5;margin-left: 25%;line-height: 18px;">發票編號：</span><span
                  style="font-family: Helvetica;">
                  <%=data.orderNo%>
              </div>
              <div style="
                 font-family: Helvetica;margin-left: 25%;"> Order No</div>
            </td>
            <td colspan="2"style="font-size: 14px;">
              <div style="
                  font-family: DFYuanMedium-B5;margin-right: 55%;
                  text-align: right;line-height: 18px;">日期：</span><span style="font-family: Helvetica;">
                  <%=data.date%>
              </div>
              <div style="
                  font-family: Helvetica;margin-right: 55%;
                  text-align: right;">Date</div>
            </td>
          </tr>
          <tr style="background-color: #ffffff;border-style: #ffffff;">
            <td colspan="6">
              <hr style="height: 3px;  background-color:'#59BDAC';border:none;" />
              <div style="height: 10px;"></div>
            </td>
          </tr>

          <tr style="background-color: #59BDAC; color: #fff;border:none"
            id="<%= data.fullWidthStyle ? 'title-pdf' : 'title-email' %>">
            <td style="
                  background-color: #B7D22E;
                  width: 25%;
                  border: none;
                  border-left: none;
                  border-top: none;
                  border-right: 4px solid #fff;
                  border-bottom: 4px solid #fff;
                ">
              <div style="padding: 5px 0 5px 0; text-align: center;">
                <div style="text-align: center;display: -webkit-inline-box;">
                  <div style="
                          font-size: 16px;
                          font-family: DFYuanMedium-B5;
                          line-height: 18px;
                          ">內容</div>
                              <div style="
                          padding-left: 5px;
                          font-size: 16px;
                          font-family: Helvetica Neue;
                          font-weight: bold;
                          line-height: 20px;
                        ">Content</div>
                </div>
              </div>
            </td>
            <td style="border-bottom: 4px solid#fff;; font-weight: normal;  width: 20%;text-align: center;">

              <div style="text-align: center;display: -webkit-inline-box;">
                <div style="
                        font-size: 16px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">日期</div>
                      <div style="
                        padding-left: 5px;
                        font-size: 16px;
                        font-family: Helvetica Neue;
                        font-weight: bold;
                        line-height: 20px;
                      ">Total Weight</div>
                    </div>

            </td>
            <td style="border-bottom: 4px solid #fff; font-weight: normal; width: 15%;text-align: center;">
              <div style="text-align: center;display: -webkit-inline-box;">
                <div style="
                        font-size: 16px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">數量</div>
                <div style="
                        padding-left: 5px;
                        font-size: 16px;
                        font-family: Helvetica Neue;
                        font-weight: bold;
                        line-height: 20px;
                      ">Unit Price</div>
              </div>

            </td>
            <td style="border-bottom: 4px solid #fff; font-weight: normal; width: 25%;text-align: center;">
              <div style="text-align: center;display: -webkit-inline-box;">
                <div style="
                        font-size: 16px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">費用</div>
                                    <div style="
                        padding-left: 5px;
                        font-size: 16px;
                        font-family: Helvetica Neue;
                        font-weight: bold;
                        line-height: 20px;
                      ">Discount</div>
              </div>
            </td>
            <td style="border-bottom: 4px solid #fff; font-weight: normal; width: 25%;text-align: center;">
                <div style="text-align: center;display: -webkit-inline-box;">
                  <div style="
                          font-size: 16px;
                          font-family: DFYuanMedium-B5;
                          line-height: 18px;
                          ">費用</div>
                                      <div style="
                          padding-left: 5px;
                          font-size: 16px;
                          font-family: Helvetica Neue;
                          font-weight: bold;
                          line-height: 20px;
                        ">Total</div>
                </div>
              </td>
          </tr>

          <%if (data.orderProductLists) { %>
            <%data.orderProductLists.forEach(function(item, index){%>
              <tr>
                <td style="width: 25%;">
                  <div style="padding: 5px 0 5px 20px;">
                    <%=item.product.name%>
                  </div>
                </td>
                <td style="width: 20%; padding: 1% 0% 1% 0%; text-align: center;">
                  <%=item.total_weight%>
                </td>
                <td style="width: 15%; padding: 1% 0% 1% 0%; text-align: center;">
                  <%=item.unit_price%>
                </td>
                <td style="width: 25%; padding: 1% 0% 1% 0%; text-align: center;">
                  <%=item.discount%>
                </td>
                <td style="width: 25%; padding: 1% 0% 1% 0%; text-align: center;">
                    <%=item.total%>
                  </td>
              </tr>

              <% }) %>
                <% } %>
        </table>
        <p class="p1"> <br /> </p>

        <br />
        <div style=" overflow: hidden;">
          <div style="text-overflow: ellipsis; overflow: hidden;table-layout: fixed;position:relative">
            <div id="leftSide">
              <table border:none cellspacing="0" cellpadding="5" style="
                width: 100%;
                background: #f1f1f2;
                min-height: 180px;
                font-size: 12px;
                padding: 5%;
                font-family: DFYuanMedium-B5;
              ">
                <tr>
                  <td valign="top" id="width-pdf">
                    <div style="text-align: center;display: -webkit-inline-box;">
                      <div style="
                        font-size: 12px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">備註</div>
                      <div style="
                        padding-left: 5px;
                        font-size: 14px;
                        font-family: Helvetica;
                        line-height: 20px;
                      ">Note：</div>
                    </div>
                  </td>
                  <td valign="top" style="word-break:break-all">
                    <span style="font-family: DFYuanMedium-B5; line-height: 18px;">
                      <%=data.remarks%>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <div style="text-align: center;display: -webkit-inline-box;">
                      <div style="
                        font-size: 12px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">經手人</div>
                      <div style="
                        padding-left: 5px;
                        font-size: 14px;
                        font-family: Helvetica;
                        line-height: 20px;
                      ">Staff：</div>
                    </div>
                  </td>
                  <td valign="top">
                    <span style="font-family: Helvetica; font-size: 14px;">
                      <%=data.handledBy%>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <div style="text-align: center;display: -webkit-inline-box;">
                      <div style="
                        font-size: 12px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">備註1</div>
                      <div style="
                        padding-left: 5px;
                        font-size: 14px;
                        font-family: Helvetica;
                        line-height: 20px;
                      ">Remarks1：</div>
                    </div>
                  </td>
                  <td valign="top" style="word-break:break-all;">
                    <span style="font-family: Helvetica; font-size: 14px; line-height: 20px;">
                      <%=data.remarks1Item%>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <div style="text-align: center;display: -webkit-inline-box;">
                      <div style="
                        font-size: 12px;
                        font-family: DFYuanMedium-B5;
                        line-height: 18px;
                        ">備註2</div>
                      <div style="
                        padding-left: 5px;
                        font-size: 14px;
                        font-family: Helvetica;
                        line-height: 20px;
                      ">Remarks2：</div>
                    </div>
                  </td>
                  <td valign="top" style="word-break:break-all">
                    <span style="font-family: Helvetica; font-size: 14px; line-height: 20px;">
                      <%=data.remarks2Item%>
                    </span>
                  </td>
                </tr>

              </table>

            </div>
            <div id="rightSide">
              <table border:none cellspacing="0" cellpadding="12"
                class="<%= data.fullWidthStyle ? 'table-pdf' : 'table-email' %>" style="
                  width: 100%;
                  min-height: 150px;
                ">
                <tr>
                  <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                    style="<%= data.chargeServices.length===0 && data.chargeOthers.length===0 ? 'border: none':'' %>">
                    <span style="font-size: 12px; font-family: DFYuanMedium-B5;">小計</span>
                  </th>
                  <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                    style="<%= data.chargeServices.length===0 && data.chargeOthers.length===0 ? 'border: none':'' %>">

                    <span style="font-size: 14px;font-family: Helvetica;">Subtotal:</span>
                  </th>
                  <th
                    style="<%= data.chargeServices.length===0  && data.chargeOthers.length===0 ? 'border: none':'border-bottom: 1px solid #808080;' %>">
                    <span style="font-family: Helvetica;font-weight: normal;font-size: 15px;">
                      <%= data.currency %>
                    </span><span style="font-family: Helvetica;font-weight: normal;font-size: 15px;">$</span><span
                      style="font-family: Helvetica;font-weight: normal;font-size: 15px;">
                      <%= data.baseFee %>
                    </span>
                  </th>
                </tr>
                <% for (var i=0; i < data.chargeServices.length; i++ ) { %>
                  <tr>
                    <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                      style="<%= data.chargeOthers.length===0 && !data.chargeServicesEnd ? 'border: none':'' %>">
                      <span style="font-size: 12px;
                   font-family: DFYuanMedium-B5">
                        <%=data.chargeServices[i].name%>
                      </span>
                    </th>
                    <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                      style="<%=data.chargeOthers.length===0 && !data.chargeServicesEnd ? 'border: none':'' %>">
                      <span style="font-family: Helvetica; font-size: 14px;">
                        <%=data.chargeServices[i].nameLan%>:
                      </span>
                    </th>
                    <th
                      style="<%= data.chargeOthers.length===0 && !data.chargeServicesEnd  ? 'border: none':'border-bottom: 1px solid #808080;' %>">
                      <%if (data.chargeServices[i].amount!=0) { %>
                        <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                          <%= data.currency %>
                        </span><span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">$</span><span
                          style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                          <%= data.chargeServices[i].amount %>
                        </span>
                        <% } %>
                    </th>
                  </tr>
                  <% } %>

                    <%if (data.chargeServicesEnd) { %>
                      <tr>
                        <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                          style="<%= data.chargeServices.length===0 || data.chargeOthers.length===0 ? 'border: none':'' %>">
                          <span style="font-size: 12px;
                     font-family: DFYuanMedium-B5">
                            <%=data.chargeServicesEnd.name%>
                          </span>
                        </th>
                        <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>"
                          style="<%=data.chargeServices.length===0 || data.chargeOthers.length===0? 'border: none':'' %>">
                          <span style="font-family: Helvetica; font-size: 14px;">
                            <%=data.chargeServicesEnd.nameLan%>:
                          </span>
                        </th>
                        <th
                          style="<%= data.chargeServices.length===0 || data.chargeOthers.length===0 ? 'border: none':'border-bottom: 1px solid #808080;' %>">
                          <%if (data.chargeServicesEnd.amount!=0) { %>
                            <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                              <%= data.currency %>
                            </span><span
                              style="font-size: 15px; font-family: Helvetica;font-weight: normal;">$</span><span
                              style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                              <%= data.chargeServicesEnd.amount %>
                            </span>
                            <% } %>
                        </th>
                      </tr>
                      <% } %>


                        <% for (var i=0; i < data.chargeOthers.length; i++ ) { %>
                          <tr>
                            <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>" colspan="2"
                              style="<%= !data.othersServiceEnd ? 'border: none':'border-bottom: 1px solid #808080;' %>">
                              <span style="font-size: 12px;font-weight: normal;
                     font-family: DFYuanMedium-B5">
                                <%=data.chargeOthers[i].description%>
                              </span>
                            </th>

                            <th
                              style="<%= !data.othersServiceEnd ? 'border: none':'border-bottom: 1px solid #808080;' %>">

                              <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                <%= data.currency %>
                              </span><span
                                style="font-size: 15px; font-family: Helvetica;font-weight: normal;">$</span><span
                                style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                <%= data.chargeOthers[i].amount %>
                              </span>

                            </th>
                          </tr>
                          <% } %>
                            <%if (data.othersServiceEnd) { %>
                              <tr>
                                <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>" colspan="2"
                                  style="border: none;font-family: Helvetica;">
                                  <span style="font-size: 12px;font-weight: normal;
                     font-family: DFYuanMedium-B5">
                                    <%=data.othersServiceEnd.description%>
                                  </span>
                                </th>

                                <th style="border: none">

                                  <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                    <%= data.currency %>
                                  </span><span
                                    style="font-size: 15px; font-family: Helvetica;font-weight: normal;">$</span><span
                                    style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                    <%= data.othersServiceEnd.amount %>
                                  </span>

                                </th>
                              </tr>
                              <% } %>

                                <tr style="background-color: #fff;">
                                  <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>" style="
                      border-bottom: none;
                      border:none;
                      border-top: 1px solid #808080;
                      font-family: DFYuanMedium-B5;
                      font-size: 16px;
                    ">
                                    <span>總數</span>
                                  </th>
                                  <th class="<%= data.fullWidthStyle ? 'fee-pdf' : 'fee-email' %>" style="
                      border-bottom: none;
                      border:none;
                      border-top: 1px solid #808080;
                    ">
                                    <span style="
                  font-family: HelveticaNeue-CondensedBlack, Helvetica Neue; font-weight: bold;font-size: 16px;">
                                      Total:
                                    </span>
                                  </th>
                                  <th style="font-size: 16px;
                      border:none;
                      border-top: 1px solid #808080;
                    ">
                                    <span style="
                  font-family: HelveticaNeue-CondensedBlack, Helvetica Neue;font-weight: bold;">
                                      <%=data.currency%>$<%=data.totalAmount%>
                                    </span>
                                  </th>
                                </tr>
              </table>
            </div>
          </div>
        </div>

        <img style="display: none;" src="<%=data.headerImage%>" />
        <img style="display: none;" src="<%=data.footerImage%>" />
        <img style="display: none;" src="<%=data.logoUrl%>" />
        <img style="display: none;" src="<%=data.iconInstagram%>" />
        <img style="display: none;" src="<%=data.iconFacebook%>" />
        <img style="display: none;" src="<%=data.iconSearch%>" />
      </div>
    </div>
  </div>
  <p style="page-break-before: always;"></p>
  <footer>
    <table
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="padding: 25px; margin: 0 auto;"
      width="600px"
    >
      <tbody style="background-color: #ffffff;">
        <tr>
          <td align="left">
            <div style="margin: 0;">
              <p style="margin-bottom: 20px;">
                <span style="font-size: 16px; line-height: 24px;"
                  >Follow us :
                </span>
                <%if (data.facebookPath) { %>
                <a
                  href="<%=data.facebookPath%>"
                  target="blank"
                  style="text-decoration: none;"
                  ><img
                    src="<%=data.iconFacebook%>"
                    style="
                      vertical-align: middle;
                      background-color: #3b5998;
                      border-radius: 8px;
                    "
                  />
                </a>
                <% } %> &nbsp; <%if (data.instagramPath) { %>
                <a
                  href="<%=data.instagramPath%>"
                  target="blank"
                  style="text-decoration: none;"
                >
                  <img
                    src="<%=data.iconInstagram%>"
                    style="
                      vertical-align: middle;
                      background: #e10980;
                      border-radius: 8px;
                    "
                  />
                </a>
                <% } %> &nbsp;
              </p>
            </div>
            <p style="color: #a6a6a6;"><%-data.email_footer_content%></p>
          </td>
        </tr>
      </tbody>
    </table>
  </footer>
</body>
</html>