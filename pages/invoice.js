import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue,
  StylesProvider
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear } from '../components/bio'
import AnimatedFilter from '../components/filter-animated'
import LazyModel from '../components/lazy-model'
import { useState } from 'react'

const Invoice = () => {
  const [tag, setTag] = useState(null)
  return (
    <Container maxWidth={'container.xl'}>
      <body>
        <header>
          <table
            cellSpacing="0"
            cellPadding="0"
            className="table-header"
            width="600px"
          >
            <tbody className="tbody">
              <tr>
                <td align="left">
                  <Image src={data?.logoUrl} className="image" alt={'image'} />
                </td>
              </tr>
            </tbody>
          </table>
        </header>
        <div className="container-panel">
          <div>
            <div id="container-pdf">
              <table
                border:none
                width="100%"
                cellSpacing="0"
                cellPadding="5"
                className="table-container"
              >
                <tr className="table-row">
                  <td colSpan="5">
                    <div className="td-main-container">
                      <div className="td-container td-space">
                        <div className="secondary-text">發票</div>
                        <div className="default-text">
                          <strong>Invoice</strong>
                        </div>
                      </div>
                    </div>
                    <div className="td-spacer"></div>
                  </td>
                </tr>
                <tr style="table-row no-border;">
                  <td
                    colSpan="1"
                    style="font-family: DFYuanMedium-B5;font-size: 14px;border:none;"
                  >
                    <div
                      style="
                    font-family: DFYuanMedium-B5;margin-left: 25%;line-height: 18px;"
                    >
                      致：
                      <span style="font-family: Helvetica;">
                        {data?.userName}
                      </span>
                    </div>
                    <div
                      style="
                      font-family: Helvetica;margin-left: 25%"
                    >
                      To
                    </div>
                  </td>
                  <td colSpan="2" style="font-size: 14px;">
                    <div
                      style="
                font-family: DFYuanMedium-B5;margin-left: 25%;line-height: 18px;"
                    >
                      發票編號：
                      <span style="font-family: Helvetica;">
                        {data?.orderNo}
                      </span>
                    </div>
                    <div
                      style="
                 font-family: Helvetica;margin-left: 25%;"
                    >
                      Order No
                    </div>
                  </td>
                  <td colSpan="2" style="font-size: 14px;">
                    <div
                      style="
                  font-family: DFYuanMedium-B5;margin-right: 55%;
                  text-align: right;line-height: 18px;"
                    >
                      日期：
                      <span style="font-family: Helvetica;">{data?.date}</span>
                    </div>
                    <div
                      style="
                  font-family: Helvetica;margin-right: 55%;
                  text-align: right;"
                    >
                      Date
                    </div>
                  </td>
                </tr>
                <tr style="background-color: #ffffff;border-style: #ffffff;">
                  <td colSpan="6">
                    <hr style="height: 3px;  background-color:'#59BDAC';border:none;" />
                    <div style="height: 10px;"></div>
                  </td>
                </tr>

                <tr
                  style="background-color: #59BDAC; color: #fff;border:none"
                  id={'title-pdf'}
                >
                  <td
                    style="
                  background-color: #B7D22E;
                  border: none;
                  border-left: none;
                  border-top: none;
                  border-right: 4px solid #fff;
                  border-bottom: 4px solid #fff;
                "
                  >
                    <div style="padding: 5px 0 5px 0; text-align: center;">
                      <div className="td-container">
                        <div className="th-secondary-text">內容</div>
                        <div className="th-primary-text">Content</div>
                      </div>
                    </div>
                  </td>
                  <td style="border-bottom: 4px solid#fff; font-weight: normal; text-align: center;">
                    <div className="td-container">
                      <div className="th-secondary-text">日期</div>
                      <div className="th-primary-text">Total Weight</div>
                    </div>
                  </td>
                  <td style="border-bottom: 4px solid #fff; font-weight: normal; text-align: center;">
                    <div className="td-container">
                      <div className="th-secondary-text">數量</div>
                      <div className="th-primary-text">Unit Price</div>
                    </div>
                  </td>
                  <td style="border-bottom: 4px solid #fff; font-weight: normal; text-align: center;">
                    <div className="td-container">
                      <div className="th-secondary-text">費用</div>
                      <div className="th-primary-text">Discount</div>
                    </div>
                  </td>
                  <td style="border-bottom: 4px solid #fff; font-weight: normal; text-align: center;">
                    <div className="td-container">
                      <div className="th-secondary-text">費用</div>
                      <div className="th-primary-text">Total</div>
                    </div>
                  </td>
                </tr>

                {data?.orderProductLists && (
                  <div>
                    data?.orderProductLists.forEach(function(item, index)
                    <tr>
                      <td className="longest-td">
                        <div className="content">{item.product.name}</div>
                      </td>
                      <td className="short-td">{item.total_weight}</td>
                      <td className="short-td">{item.unit_price}</td>
                      <td className="long-td">{item.discount}</td>
                      <td className="long-td">{item.total}</td>
                    </tr>
                  </div>
                )}
              </table>
              <p className="p1">
                <br />
              </p>
              <br />
              <div style=" overflow: hidden;">
                <div style="text-overflow: ellipsis; overflow: hidden;table-layout: fixed;position:relative">
                  <div id="leftSide">
                    <table
                      border:none
                      cellSpacing="0"
                      cellPadding="5"
                      className="table"
                    >
                      <tr>
                        <td valign="top" id="width-pdf">
                          <div className="td-container">
                            <div className="td-secondary-text">備註</div>
                            <div className="td-primary-text">Note：</div>
                          </div>
                        </td>
                        <td valign="top" style="word-break:break-all">
                          <span style="font-family: DFYuanMedium-B5; line-height: 18px;">
                            {data?.remarks}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <div className="td-container">
                            <div className="td-secondary-text">經手人</div>
                            <div className="td-primary-text">Staff：</div>
                          </div>
                        </td>
                        <td valign="top">
                          <span style="font-family: Helvetica; font-size: 14px;">
                            {data?.handledBy}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <div className="td-container">
                            <div className="td-secondary-text">備註1</div>
                            <div className="td-primary-text">Remarks1：</div>
                          </div>
                        </td>
                        <td valign="top" style="word-break:break-all;">
                          <span style="font-family: Helvetica; font-size: 14px; line-height: 20px;">
                            {data?.remarks1Item}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">
                          <div className="td-container">
                            <div className="td-secondary-text">備註2</div>
                            <div className="td-primary-text">Remarks2：</div>
                          </div>
                        </td>
                        <td valign="top" style="word-break:break-all">
                          <span style="font-family: Helvetica; font-size: 14px; line-height: 20px;">
                            {data?.remarks2Item}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div id="rightSide">
                    <table
                      border:none
                      cellSpacing="0"
                      cellPadding="12"
                      className="table-pdf rightside"
                    >
                      <tr>
                        <th
                          className="fee-pdf"
                          style={
                            data?.chargeServices.length === 0 &&
                            data?.chargeOthers.length === 0
                              ? 'border: none'
                              : ''
                          }
                        >
                          <span style="font-size: 12px; font-family: DFYuanMedium-B5;">
                            小計
                          </span>
                        </th>
                        <th
                          className="fee-pdf"
                          style={
                            data?.chargeServices.length === 0 &&
                            data?.chargeOthers.length === 0
                              ? 'border: none'
                              : ''
                          }
                        >
                          <span style="font-size: 14px;font-family: Helvetica;">
                            Subtotal:
                          </span>
                        </th>
                        <th style="{ data?.chargeServices.length===0  && data?.chargeOthers.length===0 ? 'border: none':'border-bottom: 1px solid #808080;' }">
                          <span style="font-family: Helvetica;font-weight: normal;font-size: 15px;">
                            {data?.currency}
                          </span>
                          <span style="font-family: Helvetica;font-weight: normal;font-size: 15px;">
                            $
                          </span>
                          <span style="font-family: Helvetica;font-weight: normal;font-size: 15px;">
                            {data?.baseFee}
                          </span>
                        </th>
                      </tr>
                      {data?.chargeServices.length &&
                        data?.chargeServices.forEach(data => (
                          <div>
                            <tr>
                              <th
                                className={'fee-pdf'}
                                style="{ data?.chargeOthers.length===0 && !data?.chargeServicesEnd ? 'border: none':'' }"
                              >
                                <span
                                  style="font-size: 12px;
                   font-family: DFYuanMedium-B5"
                                >
                                  {data?.chargeServices[i].name}
                                </span>
                              </th>
                              <th
                                className="fee-pdf"
                                style={
                                  data?.chargeOthers.length === 0 &&
                                  !data?.chargeServicesEnd
                                    ? 'border: none'
                                    : ''
                                }
                              >
                                <span style="font-family: Helvetica; font-size: 14px;">
                                  {data?.chargeServices[i].nameLan}:
                                </span>
                              </th>
                              <th
                                style={
                                  data?.chargeOthers.length === 0 &&
                                  !data?.chargeServicesEnd
                                    ? 'border: none'
                                    : 'border-bottom: 1px solid #808080;'
                                }
                              >
                                {data?.chargeServices[i].amount != 0 && (
                                  <div>
                                    <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                      {data?.currency}
                                    </span>
                                    <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                      $
                                    </span>
                                    <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                      {data?.chargeServices[i].amount}
                                    </span>
                                  </div>
                                )}
                              </th>
                            </tr>
                          </div>
                        ))}

                      {data?.chargeServicesEnd && (
                        <tr>
                          <th
                            className="fee-pdf"
                            style="{ data?.chargeServices.length===0 || data?.chargeOthers.length===0 ? 'border: none':'' }"
                          >
                            <span
                              style="font-size: 12px;
                     font-family: DFYuanMedium-B5"
                            >
                              {data?.chargeServicesEnd.name}
                            </span>
                          </th>
                          <th
                            className="fee-pdf"
                            style="{data?.chargeServices.length===0 || data?.chargeOthers.length===0? 'border: none':'' }"
                          >
                            <span style="font-family: Helvetica; font-size: 14px;">
                              {data?.chargeServicesEnd.nameLan}:
                            </span>
                          </th>
                          <th style="{ data?.chargeServices.length===0 || data?.chargeOthers.length===0 ? 'border: none':'border-bottom: 1px solid #808080;' }">
                            {data?.chargeServicesEnd.amount != 0 && (
                              <div>
                                <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                  {data?.currency}
                                </span>
                                <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                  $
                                </span>
                                <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                  {data?.chargeServicesEnd.amount}
                                </span>
                              </div>
                            )}
                          </th>
                        </tr>
                      )}

                      {data?.chargeOthers.length &&
                        data?.chargeOthers.forEach(data => (
                          <tr>
                            <th
                              className={'fee-pdf'}
                              colSpan="2"
                              style={
                                !data?.othersServiceEnd
                                  ? 'border: none'
                                  : 'border-bottom: 1px solid #808080;'
                              }
                            >
                              <span
                                style="font-size: 12px;font-weight: normal;
                     font-family: DFYuanMedium-B5"
                              >
                                {data?.chargeOthers[i].description}
                              </span>
                            </th>

                            <th style="{ !data?.othersServiceEnd ? 'border: none':'border-bottom: 1px solid #808080;' }">
                              <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                {data?.currency}
                              </span>
                              <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                $
                              </span>
                              <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                                {data?.chargeOthers[i].amount}
                              </span>
                            </th>
                          </tr>
                        ))}
                      {data?.othersServiceEnd && (
                        <tr>
                          <th
                            className={'fee-pdf'}
                            colSpan="2"
                            style="border: none;font-family: Helvetica;"
                          >
                            <span
                              style="font-size: 12px;font-weight: normal;
                     font-family: DFYuanMedium-B5"
                            >
                              {data?.othersServiceEnd.description}
                            </span>
                          </th>

                          <th style="border: none">
                            <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                              {data?.currency}
                            </span>
                            <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                              $
                            </span>
                            <span style="font-size: 15px; font-family: Helvetica;font-weight: normal;">
                              {data?.othersServiceEnd.amount}
                            </span>
                          </th>
                        </tr>
                      )}

                      <tr style="background-color: #fff;">
                        <th
                          className={'fee-pdf'}
                          style="
                      border-bottom: none;
                      border:none;
                      border-top: 1px solid #808080;
                      font-family: DFYuanMedium-B5;
                      font-size: 16px;
                    "
                        >
                          <span>總數</span>
                        </th>
                        <th
                          className={'fee-pdf'}
                          style="
                      border-bottom: none;
                      border:none;
                      border-top: 1px solid #808080;
                    "
                        >
                          <span
                            style="
                  font-family: HelveticaNeue-CondensedBlack, Helvetica Neue; font-weight: bold;font-size: 16px;"
                          >
                            Total:
                          </span>
                        </th>
                        <th
                          style="font-size: 16px;
                      border:none;
                      border-top: 1px solid #808080;
                    "
                        >
                          <span
                            style="
                  font-family: HelveticaNeue-CondensedBlack, Helvetica Neue;font-weight: bold;"
                          >
                            {data?.currency}${data?.totalAmount}
                          </span>
                        </th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <Image
                style="display: none;"
                src={data?.headerImage}
                alt={'img'}
              />
              <Image
                style="display: none;"
                src={data?.footerImage}
                alt={'img'}
              />
              <Image style="display: none;" src={data?.logoUrl} alt={'img'} />
              <Image
                style="display: none;"
                src={data?.iconInstagram}
                alt={'img'}
              />
              <Image
                style="display: none;"
                src={data?.iconFacebook}
                alt={'img'}
              />
              <Image
                style="display: none;"
                src={data?.iconSearch}
                alt={'img'}
              />
            </div>
          </div>
        </div>
        <p style="page-break-before: always;"></p>
        <footer>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            className="table-footer"
            width="600px"
          >
            <tbody className="tbody">
              <tr>
                <td align="left">
                  <div style="margin: 0;">
                    <p style="margin-bottom: 20px;">
                      <span style="font-size: 16px; line-height: 24px;">
                        Follow us :
                      </span>
                      {data?.facebookPath && (
                        <a
                          href={data?.facebookPath}
                          target="blank"
                          style="text-decoration: none;"
                        >
                          <Image
                            src={data?.iconFacebook}
                            className="footer-facebook-icon"
                            alt="img"
                          />
                        </a>
                      )}
                      &nbsp;
                      {data?.instagramPath && (
                        <a
                          href={data?.instagramPath}
                          target="blank"
                          style="text-decoration: none;"
                        >
                          <Image
                            src={data?.iconInstagram}
                            className="footer-instagram-icon"
                            alt="img"
                          />
                        </a>
                      )}
                      &nbsp;
                    </p>
                  </div>
                  <p style="color: #a6a6a6;"> - {data?.email_footer_content}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </footer>
      </body>
    </Container>
  )
}

export default Invoice
