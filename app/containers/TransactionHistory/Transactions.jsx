// @flow
import React from 'react'
import classNames from 'classnames'

import { ASSETS } from '../../core/constants'
import { openExplorerTx } from '../../core/explorer'
import { formatGAS, formatNEO } from '../../core/formatters'

import styles from './Transactions.scss'

type Props = {
  net: NetworkType,
  transactions: Object,
  explorer: ExplorerType,
}

const Transactions = ({ transactions, net, explorer }: Props) => {
  if (transactions.length === 0) {
    return <div className={styles.noTransactions}>No transactions</div>
  }

  return (
    <ul id='transactionList' className={styles.transactionList}>
      {
        transactions.map((t) => {
          let formatAmount = t.type === ASSETS.NEO ? formatNEO(t.amount) : formatGAS(t.amount)
          return (
            <li key={t.txid} className={styles.row}>
              <div
                className={classNames(styles.txid, 'txid')}
                onClick={() => openExplorerTx(net, explorer, t.txid)}>
                {t.txid.substring(0, 32)}
              </div>
              <div className={classNames(styles.amount, 'amount')}>{formatAmount} {t.type}</div>
            </li>
          )
        })}
    </ul>
  )
}

export default Transactions
