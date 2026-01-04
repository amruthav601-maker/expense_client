import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import { baseUrl } from '../api'
export default function Add() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({

    title: '',
    amount: 0,
    category: "",
  })
  const [isloading, setIsloading] = useState(false)
  const handleSubmit = async () => {
    //  console.log(formData)
    setIsloading(true)
    try {
      const res = await axios.post(`${baseUrl}/api/expense/insert`, formData)
      //  console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)

        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsloading(false)
      }, 2000)
    }
  }
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant='h4'>Add Expenses Details</Typography>
      </Box>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField
            value={formData.title}
            fullWidth
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            label="Enter the expense title " placeholder='Enter the expense title here'
            sx={{ mb: 2 }} />
          <TextField
            value={formData.amount} fullWidth
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            label="Enter the expense amount " placeholder='Enter the expense amount here'
            type="number" sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Expense category</InputLabel>
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              // value={age}
              label="Expense category"
              // onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Cloth"}>Cloth</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit}
            sx={{ mb: 1 }} variant='contained' fullWidth
            loading={isloading}
          >Submit</Button>
          <Button component={Link} to="/" sx={{ mb: 1 }} variant='outlined' color='secondary' fullWidth>View Entries</Button>

        </Paper>
      </Box>
    </Box>
  )
}
